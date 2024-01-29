<template>
  <div class="font-main bg-background text-main">
    <AboutHero v-if="data?.name && data?.position" :name="data.name" :position="data.position" />
    <div class="max-wrapper px-12">
      <div class="relative flex flex-col-reverse flex-wrap gap-4 md:flex-row md:flex-nowrap md:pt-8">
        <div class="summary w-full md:w-6/12">
          <BlockContent v-if="data?.summary" :content="data?.summary" />
        </div>
        <div class="profile-pic md:ml-1/12 mb-4 block w-full md:w-5/12 md:pl-4">
          <div class="img-con md:mt-[-200px]">
            <img v-if="data?.image" class="h-auto w-[290px]" :src="data.image" :alt="data.name">
            <a v-if="data?.linkedin" class="linkedin cliped-corner before:bg-background mt-6" target="_blank" :href="data?.linkedin">
              <div class="icon">
                <svg
                  aria-hidden="true"
                  height="100%"
                  style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
                  version="1.1"
                  viewBox="0 0 512 512"
                  width="100%"
                  xml:space="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:serif="http://www.serif.com/"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                ><g id="g5891"><g id="shapes"><rect
                  id="rect11"
                  height="257.962"
                  width="85.76"
                  x="61.053"
                  y="178.667"
                /><path id="path13-0" d="M104.512,54.28c-29.341,0 -48.512,19.29 -48.512,44.573c0,24.752 18.588,44.574 47.377,44.574l0.554,0c29.903,0 48.516,-19.822 48.516,-44.574c-0.555,-25.283 -18.611,-44.573 -47.935,-44.573Z" style="fill-rule:nonzero;" /><path id="path15" d="M357.278,172.601c-45.49,0 -65.866,25.017 -77.276,42.589l0,-36.523l-85.738,0c1.137,24.197 0,257.961 0,257.961l85.737,0l0,-144.064c0,-7.711 0.554,-15.42 2.827,-20.931c6.188,-15.4 20.305,-31.352 43.993,-31.352c31.012,0 43.436,23.664 43.436,58.327l0,138.02l85.741,0l0,-147.93c0,-79.237 -42.305,-116.097 -98.72,-116.097Z" style="fill-rule:nonzero;" /></g></g></svg>
              </div>

            </a>
          </div>
        </div>
      </div>
      <div class="content mt-12">
        <BlockContent v-if="data?.content" :content="data.content" />
      </div>
    </div>
    <PageBuilder :slug="`/team/${props.slug}`" document-type="people" />
  </div>
</template>

<script setup lang="ts">
import { createClient } from '@sanity/client'
import { toPlainText } from '@portabletext/vue'
import type { BlockContent } from '~/types'
import { blockContent } from '~/component_querys/blockContent'

interface Props {
  slug: string
}
const props = defineProps<Props>()
interface Page {
  name: string;
  position: string;
  summary: BlockContent;
  linkedin: string;
  image: string;
  content: BlockContent;
}

const route = useRoute()
const query = groq`*[_type == "people" && slug.current == "/team/${props.slug}" ][0] {
  name,
  position,
  summary[]{
    ${blockContent}
  },
  linkedin,
  'image': image.asset->url + '?w=290&auto=format',
  content[]{
    ${blockContent}
  },
}`
const isPreview = route.query.preview === 'true'

if (isPreview) { useSanity().config.perspective = 'previewDrafts' } else { useSanity().config.perspective = 'published' }
const sanity = createClient(useSanity().config)

// get initial page data
const { data, error } = await useAsyncData(async () => await sanity.fetch<Page>(query))
if (!data.value?.name || error.value) { throw createError({ statusCode: 404, fatal: true }) }

updatePage(data.value)

// methods
function updatePage (data: Page) {
  useHead({
    title: data.name,
    meta: [
      { name: 'description', content: data.summary ? toPlainText(data.summary) : data.name }
    ]
  })
}
</script>
<style lang="scss" scoped>
.img-con {
  .linkedin {
    svg {
      path:not(#background), rect {
        @apply fill-accent;
      }
      &:hover {
        path:not(#background), rect {
          @apply fill-background;
        }
      }
    }
  }
  a {
    @apply bg-accent inline-flex relative p-[10px] w-fit;
    clip-path: polygon(calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%, 0 0);
    &::before {
      clip-path: polygon(calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%, 0 0);
    }
    &:hover {
      &::before {
        clip-path: polygon(calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%, 0 0);
        @apply bg-accent
      }
      &.linkedin {
        svg {
          path:not(#background), rect {
            @apply fill-background;
          }
        }
      }
    }
    .icon {
      @apply w-[42px] h-[42px] flex justify-center items-center bg-transparent rounded-[3px];
    }
  }
  svg {
    @apply w-6 h-6;
  }
}
</style>
