<template>
  <div
    class="about-hero bg-dark text-main bg-full flex flex-nowrap items-center justify-start bg-no-repeat pt-28 md:pt-[16rem]"
    :style="`background-image: url(${aboutBgImg});`"
  >
    <div class="max-wrapper">
      <div class="md:w-7/12">
        <p v-if="position" class="font-headerBold !text-sm uppercase tracking-[2px] opacity-80">
          {{ position }}
        </p>
        <h1 v-if="name">
          {{ name }}
        </h1>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import aboutBgImg from '~/assets/images/personnel-banner-bg.jpg'
interface Props {
  name: string;
  position: string;
}
defineProps<Props>()
</script>
