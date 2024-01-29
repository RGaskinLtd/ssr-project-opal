<template>
  <div>
    <div class="nav">
      <h4>Navigation</h4>
      <ul v-if="navItems.length">
        <li
          v-for="(navItem, index) in navItems"
          :key="index"
        >
          <NuxtLink :to="navItem.to" class="p-0 uppercase leading-6 tracking-[2px] hover:no-underline">
            {{ navItem.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
interface NavItem {
  label: string;
  to: string;
}
interface Props {
  navItems: NavItem[];
}
const props = defineProps<Props>()
</script>
<style lang="scss" scoped>
  // a {
  //   @apply text-secondary hover:text-green text-[12px]
  // }
</style>
