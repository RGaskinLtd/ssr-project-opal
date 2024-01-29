<template>
  <div
    :class="[
      'font-main relative flex w-full justify-center',
      {'skewed-background': skewedBackground},
      {'pb-12 md:pb-12': cardTemplate === 'summary'},
      themeClasses
    ]"
    :style="[{'--bgColor': backgroundColor ?? fallbackColors.bgColor}]"
  >
    <div
      :class="[
        'max-wrapper flex w-full flex-wrap justify-center sm:w-[calc(100%-4rem)]',
        {'relative -top-20': skewedBackground}
      ]"
    >
      <div class="max-w-[50rem] pb-12 pt-8 text-center">
        <BlockContent v-if="headerContent" :content="headerContent" />
      </div>

      <div v-if="cardTemplate === 'summary' && cardsSummary?.length" class="flex w-full flex-wrap justify-between gap-8">
        <SummaryCard
          v-for="(card, index) in cardsSummary"
          :key="index"
          :card-shadow="false"
          :theme="theme"
          :card-header-underline="cardHeaderUnderline"
          v-bind="{...card}"
        />
      </div>
      <div v-if="cardTemplate === 'shortArticle' && cardsShortArticle?.length" class="flex w-full flex-wrap justify-between gap-8">
        <ShortArticleCard
          v-for="(card, index) in cardsShortArticle"
          :key="index"
          :skewed-background="skewedBackground"
          :card-shadow="cardShadow"
          :card-header-underline="cardHeaderUnderline"
          :theme="theme"
          v-bind="{ ...card }"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import type { BlockContent, Theme } from '~/types'
import { defaultFallbackColors } from '~/utils/fallbackColors'
interface Props {
  theme: Theme;
  cardTemplate?: string;
  skewedBackground?: boolean;
  cardShadow?: boolean;
  cardHeaderUnderline?: boolean;
  backgroundColor?: string;
  headerContent?: BlockContent;
  cardsSummary?: [{
    heading: string;
    content: BlockContent;
    icon: string;
  }],
  cardsShortArticle?: [{
    title: string;
    heading: string;
    content: BlockContent;
    cta: CTA
  }]
}
const props = defineProps<Props>()
const themeClasses = computed(() => {
  if (props.skewedBackground) { return twMerge(themeStyles(props.theme), 'bg-transparent') }
  return themeStyles(props.theme)
})
const fallbackColors = {
  bgColor: defaultFallbackColors.yellowGradient
}
</script>
<style lang="scss" scoped>
.skewed-background {
  &::before {
    background: var(--bgColor);
  }
}
</style>
