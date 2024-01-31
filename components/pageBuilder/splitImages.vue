<template>
  <div v-if="images.length > 1" :class="['split-content bg-background flex grow flex-wrap items-center justify-center md:h-[40vh] md:flex-nowrap', themeStyles(theme)]">
    <div
      v-for="(item, index) in images"
      :key="index"
      :class="['relative flex size-full grow items-center justify-center', {'md:w-4/12': images.length >= 3}, {'md:w-6/12': images.length > 1 && images.length < 3}, {'md:w-full': images.length === 1}]"
    >
      <img class="size-full object-cover" :src="item.asset" :alt="item.alt">
      <div v-if="item.cta" class="action absolute flex size-full flex-wrap items-center justify-center overflow-y-auto px-8 py-4">
        <div v-if="item.content" :class="['mb-4 px-8 py-4', {'bg-white/60': theme === 'light'}, {'bg-black/60': theme === 'dark'}]">
          <BlockContent :content="item.content" />
        </div>
        <POButton :uppercase="true" :class="theme" :color="item.cta.color" :btn-style="item.cta.style" :link="item.cta[item.cta.linkType]">
          {{ item.cta.text }}
        </POButton>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { BlockContent, Theme } from '~/types'

interface Props {
  theme: Theme;
  images:[{
    cta: CTA;
    content?: BlockContent
    asset: string;
    alt: string;
  }];
}
defineProps<Props>()
</script>
