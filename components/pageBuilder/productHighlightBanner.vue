<template>
  <div
    :class="['productHighlight', themeStyles(theme)]"
  >
    <div class="max-wrapper flex size-full flex-col-reverse flex-wrap items-center justify-between !p-6 !pb-24 md:flex-row">
      <div
        v-if="productHighlight"
        class="highlight relative right-[36px] mt-24 md:right-0 md:mt-0"
      >
        <img
          v-if="productHighlight.image"
          width="162px"
          height="222px"
          class="w-[162px]"
          :src="$urlFor(productHighlight.image.asset._ref)?.width(162).height(222).dpr(2).url()"
          alt="product image"
        >
        <div
          v-if="videoUrl"
          class="absolute left-[80px] top-[70px] w-[150px]"
        >
          <video
            v-if="videoUrl"
            class="size-full rounded-tr-[50px]"
            autoplay
            loop
            muted
            playsinline
          >
            <source
              :src="videoUrl"
              type="video/mp4"
            >
          </video>
        </div>
      </div>
      <ProductNav class="md:max-w-50" v-bind="productsNavigation" />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Theme } from '~/types'
const { $getFileUrl } = useNuxtApp()
interface Props {
  productHighlight?: {
    image: {
      asset: { _ref: string; }
    };
    video: {
      asset: { _ref: string; }
    };
  };
  productsNavigation?: {
    bgImage: string;
    products:[{
      name: string;
      link: string;
      image: {
        asset: { _ref: string; }
      };
    }]
  };
  theme: Theme;
}
const props = defineProps<Props>()
const videoUrl = await $getFileUrl(props.productHighlight?.video?.asset?._ref ?? '')
</script>
