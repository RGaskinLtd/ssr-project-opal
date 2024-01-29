<template>
  <div>
    <div class="logo inline-flex flex-wrap justify-center font-light">
      <a
        class="mt-4 text-center hover:no-underline md:mt-0"
        href="#top"
        @click.prevent="backToTop && scrollToTop()"
      >
        <img
          v-if="logo"
          class="mb-[10px] max-h-[150px] w-full cursor-pointer"
          :src="logo"
          alt="logo"
        >
        {{ backToTop ? 'Back to top' : '' }}
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  logo: string;
  backToTop: boolean;
}
const props = defineProps<Props>()
</script>
<style lang="scss" scoped>
  // a {
  //   @apply text-secondary hover:text-green
  // }
</style>
