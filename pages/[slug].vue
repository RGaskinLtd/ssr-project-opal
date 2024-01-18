<template>
  <div class="page-wrapper">
    <component :is="component.component" v-for="(component, index) in components" :key="index" v-bind="component.data" />
  </div>
</template>

<script setup lang="ts">
import { createClient } from '@sanity/client'

interface Page {
  title: string,
  pageBuilder: any[]
}
const route = useRoute()
const query = groq`*[_type == "page" && slug.current == "${route.params.slug}" ][0] {
  ...,
  'pageBuilder': pageBuilder[]{
    ...,
    defined(cards) => {
      ...,
      'cards': cards[]{
        ...,
        defined(cta) => {
          'cta': cta {
            ...,
            'link': select(
              link->slug.current == '/' => link->slug.current,
              link->slug.current != '/' => '/'+link->slug.current,
            )
          }
        }
      }
    },
    defined(ctaObj) => {
      'ctaObj': ctaObj {
        ...,
        'link': select(
          link->slug.current == '/' => link->slug.current,
          link->slug.current != '/' => '/'+link->slug.current,
        )
      }
    }
  }
}`
const components = shallowRef()
const { $preview } = useNuxtApp()
const isPreview = route.query.preview === 'true'

if (isPreview) { useSanity().config.perspective = 'previewDrafts' } else { useSanity().config.perspective = 'published' }
const sanity = createClient(useSanity().config)

// get initial page data
const { data, error } = await useAsyncData(async () => {
  return await sanity.fetch<Page>(query)
})
if (!data.value?.title || error.value) { throw createError({ statusCode: 404, fatal: true }) }

// update page with data
updatePage(data.value)

// methods
function updatePage (data: Page) {
  useHead({ title: data.title })
  components.value = updateComponents(data.pageBuilder ?? [])
}
function updateComponents (pageBuilder: any[]) {
  // import components
  return pageBuilder.map((component) => {
    const { _type, ...data } = component
    return {
      data,
      component: defineAsyncComponent(() => import(`@/components/pageBuilder/${_type}.vue`))
    }
  })
}
function livePreview () {
  if ($preview) {
    sanity.listen<Page>(query).subscribe((update) => {
      if (!update.result) { return }
      const data = update.result as unknown as Page
      updatePage(data)
    })
  }
}

// hooks
onMounted(() => {
  livePreview()
})
</script>
