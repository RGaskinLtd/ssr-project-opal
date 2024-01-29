<template>
  <div
    :class="themeStyles(theme)"
  >
    <div class="max-wrapper">
      <div
        v-if="partners.length"
        class="w-full lg:w-1/2"
      >
        <p class="font-HeadlineBold mb-0 pb-6">
          {{ title }}
        </p>
        <div class="flex flex-nowrap gap-4 lg:gap-6">
          <div
            v-for="(partner, index) in partners"
            :key="index"
          >
            <img
              class="w-[100px]"
              width="100px"
              height="137px"
              :src="$urlFor(partner?.image?.asset?._ref ?? '')?.width(100).dpr(2).url()"
              :alt="`${partner.name} partner`"
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
  partners:[{
    name: string;
    image: {
      asset: { _ref: string; }
    };
  }]
  theme: Theme
}

defineProps<Props>()
</script>
