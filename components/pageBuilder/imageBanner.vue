<template>
  <div
    class="relative min-h-[200px] w-full md:min-h-[500px]"
  >
    <img class="absolute z-0 size-full object-cover" :src="image" :alt="alt">
  </div>
</template>
<script setup lang="ts">
interface Props {
  image: string;
  alt: string;
}
defineProps<Props>()
</script>
