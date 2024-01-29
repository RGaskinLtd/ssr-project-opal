<template>
  <div
    :class="['relative w-full pb-8', themeStyles(theme)]"
  >
    <div
      v-if="content?.mainImage?.asset"
      :class="['flex items-end', {'flex-row-reverse': content?.reverseDirection}]"
    >
      <img
        v-if="content?.mainImage?.asset"
        :class="[
          'relative top-[-2rem] h-auto w-9/12 sm:top-[-3rem]',
          {'rounded-tr-[15vw]': !content?.reverseDirection},
          {'rounded-tl-[15vw]': content?.reverseDirection}
        ]"
        :src="content.mainImage?.asset"
        :alt="content.mainImage?.alt"
      >
      <img
        v-if="content?.icon"
        class="relative top-[-2rem] mx-4 w-[25%] max-w-[40px] transition-all duration-300 sm:top-[-3rem] sm:mx-6 sm:max-w-[60px] md:mx-8 md:max-w-[100px]"
        :src="content?.icon"
        alt="icon"
      >
    </div>
    <div class="max-wrapper flex size-full flex-wrap items-center justify-start px-6 py-12">
      <div class="w-full pb-11 lg:w-10/12">
        <BlockContent
          v-if="content?.content"
          :content="content.content"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { BlockContent, Theme } from 'types'
interface Props {
  theme: Theme;
  content?: {
    content?: BlockContent;
    reverseDirection?: boolean;
    mainImage?: {
      asset: string;
      alt: string;
    };
    icon?: string;
  };
}
defineProps<Props>()
</script>
