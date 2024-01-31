<template>
  <div class="page-wrapper">
    <component
      :is="component.component"
      v-for="(component, index) in components"
      :key="index"
      v-bind="component.data"
    />
  </div>
</template>

<script setup lang="ts">
import { createClient } from '@sanity/client'
import { hero, cards, productsNavigation, stats, infoSection, soloCta, accordions, content, splitContent, imageBanner, multiInfoSection, splitImages } from '@/component_querys'
interface Props {
  slug: string
  documentType?: string;
}
const props = withDefaults(
  defineProps<Props>(),
  {
    documentType: 'page'
  }
)
interface Page {
  title: string;
  description: string;
  pageBuilder: any[];
  newsPageBuilder: any[];
}
const route = useRoute()
const mainQuery = `
    ...,
    ${stats},
    ${hero},
    ${cards},
    ${productsNavigation},
    ${infoSection},
    ${multiInfoSection},
    ${soloCta},
    ${accordions},
    ${content},
    ${splitContent},
    ${splitImages},
    ${imageBanner}
`
const query = groq`*[_type == "${props.documentType}" && slug.current == "${props.slug}" ][0] {
  ...,
  'pageBuilder': pageBuilder[]{
    defined(_ref) => {
      ...@->content[0] {
        ${mainQuery}
      }
    },
    !defined(_ref) => {
      ${mainQuery},
    }
  },
  'newsPageBuilder': newsPageBuilder[]{
    defined(_ref) => {
      ...@->content[0] {
        ${mainQuery}
      }
    },
    !defined(_ref) => {
      ${mainQuery},
    }
  }
}`

const components = shallowRef()
const isPreview = route.query.preview === 'true'

if (isPreview) { useSanity().config.perspective = 'previewDrafts' } else { useSanity().config.perspective = 'published' }
const sanity = createClient(useSanity().config)

// get initial page data
const { data, error } = await useAsyncData(async () => {
  return await sanity.fetch<Page>(query)
})

if (!data.value || error.value) { throw createError({ statusCode: 404, fatal: true }) }

// update page with data
updatePage(data.value)

// methods
function updatePage (data: Page) {
  useHead({
    title: data.title,
    meta: [
      { name: 'description', content: data.description }
    ]
  })
  components.value = updateComponents(data.pageBuilder ?? data.newsPageBuilder ?? [])
}
function updateComponents (pageBuilder: any[]) {
  // import components
  return pageBuilder.map((component) => {
    const { _type, ...data } = component
    return {
      data,
      component: defineAsyncComponent(() => import(`~/components/pageBuilder/${_type}.vue`))
    }
  })
}

const { $autoFormatClasses } = useNuxtApp()

watch(components, () => {
  nextTick(() => $autoFormatClasses())
})
// hooks
onMounted(() => {
  nextTick(() => $autoFormatClasses())
})
</script>
