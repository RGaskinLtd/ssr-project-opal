<template>
  <div
    class="multiInfoSection bg-background flex text-white"
  >
    <div :class="['relative flex w-full flex-row flex-wrap items-center']">
      <div v-if="image" class="h-[30vh] w-full lg:min-h-[400px]">
        <img v-if="image.asset" class="size-full object-cover" :src="image.asset" :alt="image.alt">
      </div>
      <div class="bg-background flex w-full items-center pb-8">
        <div class="w-full">
          <Accordions
            v-if="infoItems"
            :title="infoItems.title"
            :theme="infoItems.theme"
            :readable="infoItems.readable"
            :display-count="infoItems.displayCount"
            :accordions-group="infoItems.accordionsGroup"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Accordions, BlockContent, Theme } from '~/types'
interface Props {
  infoItems: {
    title: BlockContent;
    readable?: boolean;
    theme: Theme;
    accordionsGroup: {
      title: BlockContent;
      accordions: Accordions;
    }
    displayCount: boolean;
  }
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
