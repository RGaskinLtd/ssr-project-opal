<template>
  <NuxtLink
    :class="`
      article cliped-corner
      shadow-light relative box-border flex w-full flex-wrap
      justify-start rounded-[5px]
      bg-accent text-main hover:cursor-pointer
      before:bg-primary
    `"
    :to="link"
    @click="checkPath(link)"
  >
    <div
      v-if="content || title"
      :class="[
        'flex grow flex-col-reverse p-[18px] md:flex-row md:flex-nowrap md:items-center',
      ]"
    >
      <div class="relative size-full md:w-6/12">
        <div class="content py-12 pr-[18px] md:pt-0">
          <h2 class="w-full font-bold leading-[1]">
            {{ title }}
          </h2>
          <BlockContent v-if="content" :prevent-links="true" :prevent-styles="true" :content="content" />
        </div>

        <div class="absolute bottom-0 left-0 flex w-full items-end justify-between pr-[18px]">
          <POButton
            btn-style="arrow"
            color="opal"
            class="read-more"
          >
            Read More
          </POButton>
          <div class="font-HeadlineBold text-[14px] uppercase tracking-[1.75px] opacity-40">
            {{ formatDate(published) }}
          </div>
        </div>
      </div>

      <div class="w-full self-start md:w-6/12">
        <img
          width="100%"
          height="auto"
          class="cliped-corner h-auto w-full rounded-[3px]"
          :src="image"
          :alt="title"
        >
      </div>
    </div>
  </NuxtLink>
</template>
<script setup lang="ts">
import type {
  PortableTextBlock,
  PortableTextMarkDefinition,
  ArbitraryTypedObject,
  PortableTextSpan
} from '@portabletext/types'
interface Props {
  published: string;
  image: string;
  tag?: string;
  title: string;
  content: PortableTextBlock<PortableTextMarkDefinition, ArbitraryTypedObject | PortableTextSpan, string, string>[];
  link: string;
}

const props = defineProps<Props>()
</script>
<style lang="scss" scoped>
  .read-more {
    @apply font-headerBold text-secondary;
  }
  .article {
    @apply text-main no-underline hover:no-underline
  }
</style>
