<template>
  <div
    class="infoSection bg-background flex text-white"
  >
    <div :class="['relative flex flex-row flex-wrap items-center',{'md:flex-row-reverse': reverseDirection}]">
      <div class="md:max-w-6/12 bg-main-900 flex items-center px-4 py-8 md:size-full md:p-8">
        <div class="w-full">
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
import type { BlockContent } from '~/types'
const { $urlFor } = useNuxtApp()
interface Props {
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
    h1 {
      font-size: 4rem;
      line-height: 4.5rem;
      @media (max-width: 1440px) {
        font-size: 3rem;
        line-height: 3.5rem;
      }
      @media (max-width: 1024px) {
        font-size: 3rem;
        line-height: 3.5rem;
      }
      @media (max-width: 768px) {
        font-size: 3rem;
        line-height: 3.5rem;
      }
    }
  }
}
</style>
