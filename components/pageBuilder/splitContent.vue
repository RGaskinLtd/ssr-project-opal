<template>
  <div v-if="image && content" :class="['split-content bg-background-800 flex flex-wrap items-center justify-center p-6 pb-20 md:flex-nowrap', themeStyles(theme)]">
    <div class="flex w-full items-center justify-center md:w-6/12">
      <img class="cliped-corner w-full rounded-[3px]" :src="image" :alt="alt">
    </div>
    <div class="flex w-full items-center justify-center md:w-6/12">
      <div class="max-w-[40rem] p-6">
        <BlockContent :content="content" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { BlockContent, Theme } from '~/types'

interface Props {
  theme: Theme;
  invert: boolean;
  image: string;
  alt: string;
  content: BlockContent;
}
defineProps<Props>()
</script>
<style lang="scss" scoped>
.split-content {
  div {
    img {
      clip-path: polygon(calc(100% - 100px) 0, 100% 100px, 100% 100%, 0 100%, 0 0);
    }
  }
}
</style>
