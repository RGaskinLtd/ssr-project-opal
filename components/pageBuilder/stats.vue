<template>
  <div
    :class="['relative flex w-full justify-center py-8', themeStyles(theme)]"
  >
    <div
      class="max-wrapper flex w-full flex-wrap justify-center"
    >
      <h3 v-if="title">
        {{ title }}
      </h3>
      <div
        v-if="stats?.length"
        class="flex w-full flex-wrap justify-center pt-8 md:flex-nowrap"
      >
        <Stat
          v-for="stat in stats"
          :key="stat._key"
          v-bind="{...stat, theme}"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Theme } from '~/types'
interface Props {
  theme: Theme;
  title?: string;
  stats?: [{
    unit?: string;
    value?: number;
    info?: string;
    _key: string;
  }]
}
defineProps<Props>()
</script>
<style lang="scss" scoped>
  .max-wrapper {
    @apply pt-20;
  }
</style>
