<template>
  <div
    ref="hero"
    :class="[
      `hero text-main relative flex size-full items-center bg-cover`,
      themeStyles(theme),
      theme,
      { 'py-2': spacing === 'sm' },
      { 'py-4': spacing === 'md' },
      { 'py-6': spacing === 'lg' },
      { 'py-8': spacing === 'xl' },
      { 'lg:h-[100vh]': fullScreen },
      { 'min-h-[40vh]': heroBgImage && !fullScreen },
    ]"
    :style="{'background-image': `url(${heroBgImage})`}"
  >
    <img v-if="heroBgImage && fullScreen" :src="heroBgImage" class="absolute size-full object-cover" alt="hero img">
    <div
      :class="[
        'inner-wrapper max-wrapper relative flex size-full flex-wrap items-center px-6',
        { 'readable': readable },
        { 'py-12 md:py-16 lg:py-20 xl:py-20': props?.bgImage?.asset?._ref },
        { 'justify-around': heroImage?.asset || threeDModel },
        { 'justify-between': productsNavigation?.products },
        { 'justify-start': !heroImage?.asset && !threeDModel }
      ]"
    >
      <div
        :class="[
          'text-overlay',
          { 'md:w-6/12': !hasTextOnly },
          { 'md:w-full': hasTextOnly && !maxWidth },
          { 'lg:w-6/12': maxWidth === '6/12' },
          { 'lg:w-7/12': maxWidth === '7/12' },
          { 'lg:w-8/12': maxWidth === '8/12' },
          { 'lg:w-9/12': maxWidth === '9/12' },
          { 'lg:w-10/12': maxWidth === '10/12' },
          { 'lg:w-11/12': maxWidth === '11/12' },
          { 'lg:w-full': maxWidth === 'full' },
        ]"
      >
        <p v-if="eyebrow" class="font-HeadlineBold !text-sm uppercase tracking-[2px] opacity-80">
          {{ eyebrow }}
        </p>
        <BlockContent v-if="mainContent" :content="mainContent" />
        <div v-if="ctas?.length" class="ctas flex flex-col flex-wrap">
          <POButton
            v-for="(cta, index) in ctas"
            :key="index"
            :class="['mr-4 mt-6', theme]"
            :color="cta.color"
            :link="cta[cta.linkType]"
          >
            {{ cta.text }}
          </POButton>
        </div>
      </div>
      <ProductNav
        v-if="productsNavigation"
        :show-title="false"
        class="md:max-w-50 pt-12 sm:pt-12 md:pl-4 md:pt-12 lg:px-3 lg:pt-0"
        v-bind="productsNavigation"
      />
      <div v-else-if="heroImage" class="max-w-90 lg:max-w-30 w-full pt-8 sm:max-w-60 sm:pt-8 md:pt-8 lg:px-3 lg:pt-0">
        <img v-if="heroImage.asset" class="w-full" :src="heroImage.asset" :alt="heroImage.alt">
      </div>
      <div v-else-if="threeDModel" class="md:max-w-4/12 max-w-7/12 flex w-full justify-center pt-8 sm:pt-8 md:pt-8 lg:px-3 lg:pt-0">
        <OpalThree />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { BlockContent, Theme } from '~/types'
import type { CTA } from '~/utils/cta'
const { $urlFor } = useNuxtApp()
interface Props {
  eyebrow?: string;
  readable?: boolean;
  template: 'full' | 'normal';
  spacing?: 'sm'|'md'|'lg'|'xl';
  maxWidth?: '6/12' | '7/12' | '8/12' | '9/12' | '10/12' | '11/12' | 'full';
  mainContent?: BlockContent;
  ctas?: CTA[];
  theme: Theme;
  bgImage?: {
    asset: { _ref: string },
  };
  productsNavigation?: {
    bgImage: string;
    products: [{
      name: string;
      link: string;
      image: {
        asset: { _ref: string; }
      };
    }]
  };
  heroImage?: {
    asset: string,
    alt: string;
  };
  threeDModel?: boolean;
}
const props = defineProps<Props>()
const hero = ref<HTMLElement>()
const fullScreen = computed(() => props.template === 'full')
const hasTextOnly = computed(() => (!props.productsNavigation && !props.heroImage && !props.threeDModel))

const heroBgImage = ref('')
function getHeroImage () {
  if (!props.bgImage) { return }

  const width = hero.value?.offsetWidth
  const height = hero.value?.offsetHeight
  if (!width || !height) { return $urlFor(props?.bgImage?.asset?._ref)?.url() }
  return $urlFor(props.bgImage.asset._ref)?.width(width)?.height(height).dpr(2)?.url()
}
function setHeroImage () {
  heroBgImage.value = getHeroImage() ?? ''
}
setHeroImage()
</script>
<style lang="scss" scoped>
.max-wrapper {
  @apply pt-24 lg:pt-6 pb-12 p-6 lg:p-6;
}
.light {
  .text-overlay {
    @apply text-black
  }
}
</style>
