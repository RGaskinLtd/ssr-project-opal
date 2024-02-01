<template>
  <NuxtLink
    :class="[
      `
      article cliped-corner
      shadow-light relative box-border
      flex w-full
      flex-wrap justify-start rounded-[3px]
      hover:cursor-pointer
      md:w-[calc(calc(100%-2rem)/2)]
      lg:w-[calc(calc(100%-4rem)/3)]
      `,
      {'bg-accent text-main before:bg-primary': theme === 'dark'},
      {'bg-black text-black before:bg-white': theme === 'light'},
      theme
    ]"
    :to="link"
    @click="checkPath(link)"
  >
    <div
      v-if="tag"
      :class="`
        absolute tag cliped-corner top-[18px] left-0 z-[2] bg-black text-white text-[23px] leading-[28px]
        font-bold py-[7px] pr-10 pl-[9px] inline-block
      `"
    >
      {{ tag }}
    </div>
    <div
      v-if="content || title"
      :class="[
        'grow p-[18px] pb-16',
      ]"
    >
      <div class="img-con relative left-0 top-0 pt-[57.42%]">
        <img
          width="100%"
          height="auto"
          :class="`
            absolute top-0 left-0 right-0 bottom-0 w-full h-full
            object-cover object-center rounded-[3px] cliped-corner
          `"
          :src="image"
          :alt="title"
        >
      </div>

      <div class="content py-4">
        <h4 class="w-full font-bold">
          {{ title }}
        </h4>
        <BlockContent v-if="content" :content="content" :prevent-links="true" />
      </div>

      <div class="absolute bottom-0 left-0 flex w-full items-end justify-between p-[18px]">
        <POButton
          btn-style="arrow"
          :class="['read-more', theme]"
        >
          Read More
        </POButton>
        <div class="font-headerBold text-right text-[14px] uppercase tracking-[1.75px] opacity-40">
          {{ formatDate(published) }}
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
<script setup lang="ts">
import type {
  PortableTextBlock,
  PortableTextMarkDefinition,
  ArbitraryTypedObject,
  PortableTextSpan
} from '@portabletext/types'
import type { Theme } from '~/types'
interface Props {
  published: string;
  image: string;
  tag?: string;
  title: string;
  theme: Theme;
  content: PortableTextBlock<PortableTextMarkDefinition, ArbitraryTypedObject | PortableTextSpan, string, string>[];
  link: string;
}

const props = defineProps<Props>()
</script>
<style lang="scss" scoped>
  .light {
    .read-more {
      @apply text-black;
    }
    &.article {
      @apply text-black;
    }
  }
  .read-more {
    @apply font-headerBold text-main;
  }
  .article {
    @apply text-main no-underline hover:no-underline
  }
  .tag {
    clip-path: polygon(calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%, 0 0);
  }
</style>
