<template>
  <div
    :class="['our-people bg-full overflow-hidden bg-no-repeat py-8', themeStyles(theme)]"
  >
    <div v-if="title" class="max-wrapper flex justify-center">
      <h1 class="text-center">
        {{ title }}
      </h1>
    </div>
    <div
      :class="styling?.con"
      :style="styling.conStyles"
    >
      <NuxtLink v-for="(person, index) in ourPeople" :key="index" :to="person.link" :class="[styling?.person, theme]" :style="styling.personStyles">
        <img class="cliped-corner w-full" :src="person.image" :alt="person.name">
        <div class="info">
          <p class="font-HeadlineBold green-underline mt-4 text-2xl">
            {{ person.name }}
          </p>
          <p class="smaller">
            {{ person.position }}
          </p>
        </div>
      </NuxtLink>
    </div>
    <div v-if="slider" class="flex w-full flex-nowrap items-center justify-between p-4 md:w-6/12 md:pl-20">
      <button :disabled="isAtStartOfSlides" class="left-arrow flex flex-nowrap items-center border-none outline-none disabled:text-gray-400" @click="prevSlide">
        Prev
      </button>
      <button :disabled="hasHitEndSlide" class="right-arrow flex flex-nowrap items-center border-none outline-none disabled:text-gray-400" @click="nextSlide">
        Next
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { createClient } from '@sanity/client'
import type { OurPeople, Theme } from '~/types'

interface Props {
  title?: string;
  theme: Theme;
  slider: boolean;
}
const props = defineProps<Props>()

const ourPeople = ref<OurPeople[]>([])

const route = useRoute()
const query = groq`*[_type == "people"] | order(orderRank) {
  name,
  position,
  'image': image.asset->url + '?w=580&auto=format',
  'link': slug.current
}`
const isPreview = route.query.preview === 'true'

if (isPreview) { useSanity().config.perspective = 'previewDrafts' } else { useSanity().config.perspective = 'published' }
const sanity = createClient(useSanity().config)

// get initial page data
const { data, error } = await useAsyncData(async () => await sanity.fetch<OurPeople[]>(query))
if (data.value?.length && !error.value) {
  ourPeople.value = data.value
}

// Slider Logic
function prevSlide () {
  const slidWidth = personWidth.value + gapWidth.value
  if (sliderPosition.value >= slidWidth) {
    const newVal = sliderPosition.value - slidWidth
    // we only do this to make sure the maths always aligns even if the browser width is off by a billionth of a point
    if (newVal < slidWidth) { sliderPosition.value = 0 } else { sliderPosition.value = sliderPosition.value - slidWidth }
  }
  hasHitEndSlide.value = false
}
function nextSlide () {
  const slidWidth = personWidth.value + gapWidth.value
  if (sliderPosition.value >= 0 && sliderPosition.value < lastSlidePos.value) { sliderPosition.value = sliderPosition.value + slidWidth }
  hasHitEndSlide.value = sliderPosition.value === lastSlidePos.value
}
const windowSize = ref(0)
const personWidth = ref(241)
const gapWidth = ref(50)
const sliderPosition = ref(0)
const lastSlidePos = ref(0)
const hasHitEndSlide = ref(false)
const isAtStartOfSlides = computed(() => sliderPosition.value === 0)
const styling = computed(() => {
  if (!props.slider) {
    return {
      con: 'max-wrapper gap-8 flex w-full flex-wrap justify-center',
      person: 'person bg-accent relative before:bg-primary cliped-corner w-full p-4 pb-12 sm:w-[calc((100%/2)-1rem)] md:w-[calc((100%/3)-1.33333333333rem)] lg:w-[calc((100%/4)-2rem)]'
    }
  } else {
    return {
      con: 'flex transition-all duration-500 w-full md:gap-x-[50px]',
      conStyles: `transform: translateX(-${sliderPosition.value}px); column-gap: ${gapWidth.value}px;`,
      person: 'person flex-shrink-0 flex-grow-0 p-4 pb-12',
      personStyles: `width: ${personWidth.value}px`
    }
  }
})

function updateSizes (event: any) {
  if (typeof event === 'number') { windowSize.value = event } else { windowSize.value = event.target?.innerWidth }
  const isMobile = windowSize.value <= 600
  const isTablet = windowSize.value > 600 && windowSize.value < 1200
  const isLaptop = windowSize.value >= 1200 && windowSize.value < 1600
  const isDesktop = windowSize.value >= 1600
  let slidesDisplayed = 0

  if (isMobile) { slidesDisplayed = 2 }
  if (isTablet) { slidesDisplayed = 3 }
  if (isLaptop) { slidesDisplayed = 5 }
  if (isDesktop) { slidesDisplayed = 6 }

  gapWidth.value = Math.floor(slidesDisplayed) * 10
  personWidth.value = (windowSize.value - (gapWidth.value * Math.floor(slidesDisplayed - 1))) / slidesDisplayed
  lastSlidePos.value = (ourPeople.value.length - slidesDisplayed) * (gapWidth.value + personWidth.value)
  sliderPosition.value = 0
  hasHitEndSlide.value = false
}
onMounted(() => {
  updateSizes(window.innerWidth)
  window.addEventListener('resize', updateSizes)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateSizes)
})
</script>
<style lang="scss" scoped>
.max-wrapper {
  &.gutter {
    padding: 1.5rem 0.5rem;
  }
}
a.person {
  @apply no-underline;
  &.light { @apply text-black; }
  &.dark { @apply text-main; }
}
.light {
  .left-arrow {
    @apply border-l-main-800;
    &:disabled { @apply border-l-gray-400; }
  }
  .right-arrow {
    @apply border-r-main-800;
    &:disabled { @apply border-r-gray-400 }
  }
}
.dark {
  .left-arrow {
    @apply border-l-secondary;
    &:disabled { @apply border-l-gray-400; }
  }
  .right-arrow {
    @apply border-r-secondary;
    &:disabled { @apply border-r-gray-400; }
  }
}
.left-arrow {
  &::before {
    margin-right: 8px;
    content: '';
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right:8px solid;
  }
}
.right-arrow {
  &::after {
    margin-left: 8px;
    content: '';
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 8px solid;
  }
}
</style>
