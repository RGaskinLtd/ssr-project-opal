<template>
  <div class="bg-lightGray text-darkText font-main">
    <NewsHero v-if="data?.image" :image="data.image" :alt="data?.summary ? toPlainText(data?.summary) : data?.title" />
    <div class="max-wrapper readable">
      <div class="relative flex flex-wrap gap-4 pt-8 lg:flex-nowrap">
        <div class="content w-full lg:w-[calc(100%-4.5rem)]">
          <BlockContent v-if="data?.content" :content="data?.content" />
        </div>
        <SocialIcons :summary="data?.summary ? toPlainText(data?.summary) : data?.title ?? ''" />
      </div>
      <h2 class="pt-12">
        More articles from Project Opal.
      </h2>
    </div>
    <LatestNews />
  </div>
</template>

<script setup lang="ts">
import { createClient } from '@sanity/client'
import type { PortableTextBlock, PortableTextMarkDefinition, ArbitraryTypedObject, PortableTextSpan } from '@portabletext/types'
import { toPlainText } from '@portabletext/vue'
import { blockContent } from '~/component_querys/blockContent'

interface Props {
  slug: string
}
const props = defineProps<Props>()
interface Page {
  title: string;
  summary: PortableTextBlock | ArbitraryTypedObject[] | PortableTextBlock[],
  image: string;
  content: PortableTextBlock<PortableTextMarkDefinition, ArbitraryTypedObject | PortableTextSpan, string, string>[];
}

const route = useRoute()
const query = groq`*[_type == "newsPage" && slug.current == "/news/${props.slug}" ][0] {
  ...,
  content[]{
    ${blockContent}
  },
  'image': image.asset->url + '?w=1200&auto=format'
}`
const isPreview = route.query.preview === 'true'

if (isPreview) { useSanity().config.perspective = 'previewDrafts' } else { useSanity().config.perspective = 'published' }
const sanity = createClient(useSanity().config)

// get initial page data
const { data, error } = await useAsyncData(async () => await sanity.fetch<Page>(query))
if (!data.value?.title || error.value) { throw createError({ statusCode: 404, fatal: true }) }

updatePage(data.value)

// methods
function updatePage (data: Page) {
  useHead({
    title: data.title,
    meta: [
      { name: 'description', content: data.summary ? toPlainText(data.summary) : data.title }
    ]
  })
}
</script>
