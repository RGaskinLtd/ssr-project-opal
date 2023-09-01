<template>
  <div
    :class="[
      'cta',
      {'justify-start': align === 'left'},
      {'justify-center': align === 'center'},
      {'justify-end': align === 'right'}
    ]"
    :style="{
      'background-color': bgColor?.hex,
      'color': ctaObj?.btnTextColor?.hex ?? '#fff',
    }"
  >
    <a
      v-if="ctaObj?.link || ctaObj?.text"
      class="btn"
      :style="{
        'background-color': ctaObj?.btnBgColor?.hex ?? '#000',
        'color': ctaObj?.btnTextColor?.hex ?? '#fff'
      }"
      :href="ctaObj.link"
    >{{ ctaObj.text }}</a>
  </div>
</template>
<script setup lang="ts">
interface Props {
  ctaObj?: {
    text: string;
    link: string;
    btnBgColor?: {
      hex: string;
    };
    btnTextColor?: {
      hex: string;
    };
  };
  bgColor?: {
    hex: string;
  };
  align: string;
}
const props = defineProps<Props>()
</script>
<style lang="scss" scoped>
.cta {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  color: #fff;
  padding: 1rem 0;
  a {
    text-decoration: none;
    color: #fff;
    &.btn {
      text-transform: uppercase;
      padding: 0.75rem 1.25rem;
    }
  }
}
</style>
