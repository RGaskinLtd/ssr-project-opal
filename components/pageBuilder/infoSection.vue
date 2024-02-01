<template>
  <div
    :class="['infoSection flex', themeStyles(theme), theme]"
  >
    <div :class="['relative flex flex-row flex-wrap items-center',{'md:flex-row-reverse': reverseDirection}]">
      <div :class="['md:max-w-6/12 flex items-center px-4 py-8 md:size-full md:p-8', {'bg-main-900': theme === 'dark'}, {'bg-white': theme === 'light'}]">
        <div class="content w-full">
          <BlockContent v-if="content" :content="content" />
        </div>
      </div>
      <div v-if="image" class="md:max-w-6/12 md:size-full">
        <img v-if="image.asset" class="size-full object-cover" :src="image.asset" :alt="image.alt">
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { BlockContent, Theme } from '~/types'
const { $urlFor } = useNuxtApp()
interface Props {
  theme: Theme;
  content?: BlockContent;
  reverseDirection?: boolean;
  image?: {
    asset: string;
    alt: string;
  };
}
const props = defineProps<Props>()

</script>
<style lang="scss" scoped>
.infoSection {
  width: 100%;
  position: relative;
  color: #fff;
  background-size: cover;

  &.light {
    .content {
      @apply text-black
    }
  }

  .inner-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    padding: 3rem 0;
    .hero-image {
      width: 100%;
    }
  }
}
</style>
