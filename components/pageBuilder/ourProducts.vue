<template>
  <div
    :class="themeStyles(theme)"
  >
    <div class="max-wrapper">
      <div
        v-if="products.length"
        class="w-full lg:w-1/2"
      >
        <h4 class="pb-12">
          {{ title }}
        </h4>
        <div class="flex flex-nowrap gap-4 lg:gap-6">
          <div
            v-for="(product, index) in products"
            :key="index"
          >
            <img
              class="w-[100px]"
              width="100px"
              height="137px"
              :src="$urlFor(product?.image?.asset?._ref ?? '')?.width(100).height(137).dpr(2).url()"
              :alt="`${product.name} product`"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Theme } from '~/types'

interface Props {
  title: string;
  products:[{
    name: string;
    image: {
      asset: { _ref: string; }
    };
  }]
  theme: Theme
}

defineProps<Props>()
</script>
