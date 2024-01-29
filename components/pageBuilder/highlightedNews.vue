<template>
  <div class="bg-main-50 text-black">
    <div class="latest-news max-wrapper flex w-full flex-wrap justify-start">
      <h1 v-if="title" class="pb-12">
        {{ title }}
      </h1>
      <div class="articles flex w-full flex-wrap justify-around pb-4">
        <FeaturedArticle
          v-if="newsArticle"
          :published="newsArticle.oldPublishedDate ?? newsArticle.published"
          :image="newsArticle.image"
          :tag="newsArticle.tag"
          :title="newsArticle.title"
          :content="newsArticle.summary"
          :link="newsArticle.link"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { createClient } from '@sanity/client'
import { blockContent } from '~/component_querys/blockContent'
import type { NewsArticle } from '~/types'

interface Props {
  title?: string;
}
defineProps<Props>()

const newsArticle = ref<NewsArticle>()

const route = useRoute()
const query = groq`*[_type == "newsPage"] | order(_createdAt desc)[0] {
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
const { data, error } = await useAsyncData(async () => await sanity.fetch<NewsArticle>(query))
if (data.value?.title && !error.value) { newsArticle.value = data.value }
</script>
