<template>
  <div>
    <div class="max-wrapper flex flex-wrap justify-between md:flex-nowrap">
      <div class="copy-right flex w-full flex-nowrap items-center gap-4 md:w-auto">
        <span class="regular">©️ {{ new Date().getFullYear() }}</span>
        <img
          v-if="logo"
          class="h-[20px]"
          :src="logo"
          alt="logo"
        >
      </div>
      <div class="legal-links-con w-full pt-8 md:w-auto md:pt-0">
        <ul
          v-if="legalItems?.length"
          class="legal-links flex flex-wrap -indent-2 sm:indent-0 md:flex-nowrap"
        >
          <li
            v-for="(legalItem, index) in legalItems"
            :key="index"
            class="w-full px-2 md:w-auto"
          >
            <NuxtLink class="p-0 text-[14px] uppercase leading-6 tracking-[2px] transition-all duration-300 hover:no-underline" :to="legalItem.to">
              {{ legalItem.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
interface NavItem {
  label: string;
  to: string;
}
interface Props {
  legalItems: NavItem[];
  logo: string;
}
const props = defineProps<Props>()
</script>
<style lang="scss" scoped>
  // a {
  //   @apply text-white hover:text-green
  // }
</style>
