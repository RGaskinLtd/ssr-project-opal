<template>
  <div
    :class="[
      `
      cliped-corner before:bg-primary relative box-border flex w-full flex-wrap
      justify-start rounded-[3.6px] xl:w-[calc(calc(100%-4rem)/3)]
      `,
      { 'md:w-[calc(calc(100%-4rem)/3)]': isSummary },
      { 'md:w-[calc(calc(100%-2rem)/2)]': !isSummary },
      { 'shadow-main': cardShadow },
      { 'summary': isSummary },
      themeClasses
    ]"
  >
    <div
      v-if="title"
      :class="`
        absolute top-[18px] left-0 z-[2] bg-black text-white
        font-bold py-[7px] pr-10 pl-[9px] rounded-tr-[21px] inline-block
      `"
    >
      {{ title }}
    </div>
    <div
      :class="[
        'grow px-8 pb-8',
        { 'pt-20': skewedBackground },
        { 'pt-20': !skewedBackground && !isSummary },
        { 'pt-8': !skewedBackground && isSummary },
      ]"
    >
      <slot />
    </div>

    <div v-if="cta && cta[cta.linkType] && cta.text" class="flex items-end p-[18px] pt-0">
      <POButton
        :link="cta[cta.linkType]"
        :btn-style="cta?.style ?? 'arrow'"
        :color="cta.color ?? 'black'"
      >
        {{ cta.text }}
      </POButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Theme } from '~/types'
import type { CTA } from '~/utils/cta'

interface Props {
  theme: Theme;
  cardTemplate?: string;
  skewedBackground?: boolean;
  cardShadow?: boolean;
  title?: string;
  cta?: CTA;
}

const props = defineProps<Props>()
const isSummary = computed(() => props?.cardTemplate === 'summary')
const themeClasses = computed(() => {
  return props.theme === 'dark' ? 'bg-accent text-main' : 'bg-white text-black'
})
</script>
