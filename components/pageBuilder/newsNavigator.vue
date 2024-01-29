<template>
  <div class="bg-background text-main py-8">
    <div class="max-wrapper flex w-full flex-wrap justify-start">
      <h1 v-if="title" class="pb-6">
        {{ title }}
      </h1>
      <div class="flex w-full flex-wrap items-center justify-start gap-y-2 pb-8">
        <button v-for="(tag, index) in tags" :key="index" class="tag" @click="filterByTag(tag.tag)">
          {{ tag.title }}
        </button>
        <Transition name="fade">
          <button v-if="!!activeTag" class="tag" @click="clearFilters">
            <span>Clear Filters</span>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </Transition>
      </div>
      <div class="flex w-full flex-wrap justify-between gap-8 pb-4">
        <CardArticle
          v-for="(newsArticle, index) in newsArticles"
          :key="index"
          :published="newsArticle.oldPublishedDate ?? newsArticle.published"
          :image="newsArticle.image"
          :tag="newsArticle.tag"
          :title="newsArticle.title"
          :content="newsArticle.summary"
          :link="newsArticle.link"
        />
      </div>
      <div v-if="moreToLoad" class="flex w-full items-center justify-center py-12">
        <POButton color="black" btn-style="ev" @click="loadNews(nextNewsRangeToLoad)">
          Load More
        </POButton>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { createClient } from '@sanity/client'
import { blockContent } from '~/component_querys/blockContent'
import type { NewsArticle } from '~/types'

interface Tag {
  title: string;
  tag: string;
}
interface Props {
  title?: string;
}
defineProps<Props>()

const route = useRoute()
const isPreview = route.query.preview === 'true'
if (isPreview) { useSanity().config.perspective = 'previewDrafts' } else { useSanity().config.perspective = 'published' }
const sanity = createClient(useSanity().config)

const setsOf = 3
const nextNewsRangeToLoad = { start: 0 + setsOf, end: setsOf + setsOf }
const newsArticles = ref<NewsArticle[]>([])
const tags = ref<Tag[]>([])
const moreToLoad = ref(true)
const activeTag = ref('')

async function filterByTag (tag: string) {
  if (activeTag.value === tag) { return }
  activeTag.value = tag
  await loadNews({ start: 0, end: setsOf - 1 })
}

async function clearFilters () {
  activeTag.value = ''
  await loadNews({ start: 0, end: setsOf }, true)
}

async function getTags () {
  const query = groq`*[_type == "newsTag"] | order(_createdAt desc) {
    title,
    'tag': tag.current
  }`
  const { data, error } = await useAsyncData(async () => await sanity.fetch<Tag[]>(query))
  if (data.value?.length && !error.value) { tags.value = data.value }
}

async function loadNews ({ start = 0, end = setsOf }: {start: number, end: number}, reset?: boolean) {
  const tagFilterQuery = `&& tag->tag.current == "${activeTag.value}"`
  const query = groq`*[_type == "newsPage" ${activeTag.value ? tagFilterQuery : ''}] | order(_createdAt desc)[${start}..${end}] {
    'oldPublishedDate': publishedDate,
    'published': _createdAt,
    title,
    summary[]{
      ${blockContent}
    },
    'tag': tag->tag.current,
    'image': image.asset->url + '?w=780&auto=format',
    'link': slug.current
  }`

  // get initial page data
  const { data, error } = await useAsyncData(async () => await sanity.fetch<NewsArticle[]>(query))
  if (data.value?.length && !error.value) {
    if ((activeTag.value && start === 0) || reset) { newsArticles.value = data.value } else { newsArticles.value.push(...data.value) }
    nextNewsRangeToLoad.start = start + setsOf
    nextNewsRangeToLoad.end = end + setsOf
    moreToLoad.value = data.value?.length >= setsOf
  }
}
await getTags()
await loadNews({ start: 0, end: setsOf })
</script>
<style lang="scss" scoped>
  .tag {
    @apply bg-black text-white flex gap-2 flex-nowrap py-2 px-4 rounded-full mr-2 cursor-pointer hover:bg-white hover:text-black transition-all duration-300 disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:hover:text-white;
  }
</style>
