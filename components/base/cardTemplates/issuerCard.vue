<template>
  <Card v-if="description && address" theme="light" :title="name" :card-shadow="true">
    <div class="bio green-underline">
      <BlockContent v-if="description" :content="description" />
      <BlockContent v-if="address" :content="address" />
    </div>
    <div class="text-grayText pb-2 text-[14px] uppercase tracking-[1.75px]">
      {{ companyDetails?.title }}
    </div>
    <ul>
      <li>
        <NuxtLink :to="companyDetails?.website">
          {{ companyDetails?.website }}
        </NuxtLink>
      </li>
      <li v-if="companyDetails?.email">
        <NuxtLink :to="companyDetails?.email">
          {{ textFromMailTo(companyDetails?.email) }}
        </NuxtLink>
      </li>
    </ul>
    <div v-if="companyDetails?.logo" class="logo flex w-full items-center justify-end">
      <img :src="companyDetails?.logo" width="150" height="auto" alt="company logo">
    </div>

    <div v-if="showLogoCon" class="logo flex w-full items-center justify-end">
      <slot name="logo" />
    </div>
  </Card>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'
import type { CountryData } from '~/types'
const props = defineProps<CountryData>()

const slots = useSlots()

const showLogoCon = computed(() => !!slots.logo)
</script>
<style lang="scss" scoped>
  :deep() {
    .bio {
      p { @apply text-[16px] font-main text-black }
    }
    ul {
      li {
        a { @apply font-main text-black text-[14px] }
      }
    }
  }
</style>
