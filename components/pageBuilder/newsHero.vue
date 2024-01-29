<template>
  <div class="news-hero bg-dark flex flex-nowrap items-center justify-start">
    <div class="w-full">
      <div class="relative pt-[30vh] md:pt-[50vh]">
        <img class="object-cente absolute inset-0 size-full object-cover" :src="image" :alt="alt">
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  image: string;
  alt?: string;
}
const props = defineProps<Props>()
</script>
