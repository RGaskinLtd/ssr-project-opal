<template>
  <div
    class="infoSection bg-background text-white"
  >
    <div :class="['inner-wrapper max-wrapper', {'lg:flex-row-reverse': content?.reverseDirection}]">
      <div class="text-overlay lg:max-w-7/12 w-full px-6 md:px-0">
        <h2 v-if="content?.headingObj" :class="{'green-overline': content.headingObj.greenOverline}">
          {{ content?.headingObj.heading }}
        </h2>
        <SanityContent v-if="content?.tagline" :blocks="content.tagline" />
      </div>
      <div v-if="content?.image" class="image lg:max-w-4/12 max-w-60 pt-8 sm:pt-8 md:pt-8 lg:px-3 lg:pt-0">
        <img v-if="content?.image.asset" :src="$urlFor(content.image.asset._ref).url()" :alt="content.image.alt">
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PortableTextBlock } from '@portabletext/types'
const { $urlFor } = useNuxtApp()
interface Props {
  content?: {
    headingObj?: {
      heading: string;
      greenOverline: string;
    };
    tagline?: PortableTextBlock;
    reverseDirection?: boolean;
    image?: {
      asset: {
        _ref: string;
        _type: string;
      },
      alt: string;
    };
  };
  bgColor?: {
    hex: string;
  };
  textColor?: {
    hex: string;
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
