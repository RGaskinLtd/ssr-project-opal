<template>
  <div :class="['bg-lightGray text-dark', themeStyles(theme)]">
    <div class="latest-news max-wrapper flex w-full flex-wrap justify-center">
      <h1 v-if="title" class="pb-12 pt-8">
        {{ title }}
      </h1>
      <div
        :class="[
          'articles flex w-full flex-wrap gap-8 pb-4',
          {'justify-start': newsArticles.length <= 2},
          {'justify-between': newsArticles.length >= 3}
        ]"
      >
        <CardArticle
          v-for="(newsArticle, index) in newsArticles"
          :key="index"
          :published="newsArticle.oldPublishedDate ?? newsArticle.published"
          :image="newsArticle.image"
          :theme="theme"
          :tag="newsArticle.tag"
          :title="newsArticle.title"
          :content="newsArticle.summary"
          :link="newsArticle.link"
        />
      </div>
      <div class="more-news-cta flex w-full items-center justify-center py-12">
        <POButton :class="theme" color="opal" btn-style="po" link="/news">
          More News
        </POButton>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { createClient } from '@sanity/client'
import { blockContent } from '~/component_querys/blockContent'
import type { NewsArticle, Theme } from '~/types'

interface Props {
  theme: Theme;
  title?: string;
}
defineProps<Props>()

const newsArticles = ref<NewsArticle[]>([])

const route = useRoute()
const query = groq`*[_type == "newsPage"] | order(_createdAt desc)[0..2] {
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
const isPreview = route.query.preview === 'true'

if (isPreview) { useSanity().config.perspective = 'previewDrafts' } else { useSanity().config.perspective = 'published' }
const sanity = createClient(useSanity().config)

// get initial page data
const { data, error } = await useAsyncData(async () => await sanity.fetch<NewsArticle[]>(query))
if (data.value?.length && !error.value) {
  newsArticles.value = data.value
}
</script>
<style lang="scss" scoped>
.max-wrapper {
  @apply pt-0;
}
</style>
<style lang="scss" scoped>
  .max-wrapper {
    @apply lg:py-6 lg:px-2;
  }
</style>
