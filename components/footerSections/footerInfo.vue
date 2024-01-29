<template>
  <div>
    <div class="info [&>p]:!text-[16px]">
      <h4>
        Information
      </h4>
      <BlockContent
        v-if="infoContent"
        :content="infoContent"
      />
    </div>
    <div class="social mt-[20px] flex gap-4">
      <NuxtLink
        v-for="(item, key) in Object.entries(socialLinks).sort()"
        :key="key"
        :to="item[1]"
        target="_blank"
        :aria-label="`our ${item[0].toLowerCase()}`"
        :class="`social-link ${item[0].toLowerCase()} inline-flex w-8 no-underline`"
      >
        <svg
          v-if="item[0].toLowerCase() === 'linkedin'"
          aria-hidden="true"
          height="100%"
          style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
          version="1.1"
          viewBox="0 0 512 512"
          width="100%"
          xml:space="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:serif="http://www.serif.com/"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        ><g id="g5891"><path id="background" d="M512,64c0,-35.323 -28.677,-64 -64,-64l-384,0c-35.323,0 -64,28.677 -64,64l0,384c0,35.323 28.677,64 64,64l384,0c35.323,0 64,-28.677 64,-64l0,-384Z" /><g id="shapes"><rect
          id="rect11"
          height="257.962"
          width="85.76"
          x="61.053"
          y="178.667"
        /><path id="path13-0" d="M104.512,54.28c-29.341,0 -48.512,19.29 -48.512,44.573c0,24.752 18.588,44.574 47.377,44.574l0.554,0c29.903,0 48.516,-19.822 48.516,-44.574c-0.555,-25.283 -18.611,-44.573 -47.935,-44.573Z" style="fill-rule:nonzero;" /><path id="path15" d="M357.278,172.601c-45.49,0 -65.866,25.017 -77.276,42.589l0,-36.523l-85.738,0c1.137,24.197 0,257.961 0,257.961l85.737,0l0,-144.064c0,-7.711 0.554,-15.42 2.827,-20.931c6.188,-15.4 20.305,-31.352 43.993,-31.352c31.012,0 43.436,23.664 43.436,58.327l0,138.02l85.741,0l0,-147.93c0,-79.237 -42.305,-116.097 -98.72,-116.097Z" style="fill-rule:nonzero;" /></g></g></svg>
        <svg
          v-if="item[0].toLowerCase() === 'twitter'"
          aria-hidden="true"
          height="100%"
          style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
          version="1.1"
          viewBox="0 0 512 512"
          width="100%"
          xml:space="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:serif="http://www.serif.com/"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        ><rect height="400" style="fill:none;" width="400" x="56" y="56" /><path d="M161.014,464.013c193.208,0 298.885,-160.071 298.885,-298.885c0,-4.546 0,-9.072 -0.307,-13.578c20.558,-14.871 38.305,-33.282 52.408,-54.374c-19.171,8.495 -39.51,14.065 -60.334,16.527c21.924,-13.124 38.343,-33.782 46.182,-58.102c-20.619,12.235 -43.18,20.859 -66.703,25.498c-19.862,-21.121 -47.602,-33.112 -76.593,-33.112c-57.682,0 -105.145,47.464 -105.145,105.144c0,8.002 0.914,15.979 2.722,23.773c-84.418,-4.231 -163.18,-44.161 -216.494,-109.752c-27.724,47.726 -13.379,109.576 32.522,140.226c-16.715,-0.495 -33.071,-5.005 -47.677,-13.148l0,1.331c0.014,49.814 35.447,93.111 84.275,102.974c-15.464,4.217 -31.693,4.833 -47.431,1.802c13.727,42.685 53.311,72.108 98.14,72.95c-37.19,29.227 -83.157,45.103 -130.458,45.056c-8.358,-0.016 -16.708,-0.522 -25.006,-1.516c48.034,30.825 103.94,47.18 161.014,47.104" style="fill-rule:nonzero;" /></svg>
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PortableTextBlock, PortableTextMarkDefinition, ArbitraryTypedObject, PortableTextSpan } from '@portabletext/types'
type SanityContent = PortableTextBlock<PortableTextMarkDefinition, ArbitraryTypedObject | PortableTextSpan, string, string>[];
interface Props {
  infoContent: SanityContent;
  socialLinks: {
    linkedIn: string;
    twitter: string;
  }
}
const props = defineProps<Props>()
</script>
<style lang="scss">
.linkedin {
  svg {
    @apply fill-secondary;
    path:not(#background), rect {
      @apply fill-background-800;
    }
    &:hover {
      @apply fill-secondary-300;
    }
  }
}
.twitter {
  svg {
    @apply fill-primary;
    &:hover {
      @apply fill-accent;
    }
  }
}
</style>
