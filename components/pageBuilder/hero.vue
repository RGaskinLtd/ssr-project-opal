<template>
  <div
    class="hero bg-background text-text"
  >
    <div :class="['inner-wrapper max-wrapper', {'justify-around': heroImage?.asset}, {'justify-start': !heroImage?.asset}]">
      <div class="text-overlay lg:max-w-7/12 w-full px-6 sm:w-full md:w-full md:px-0">
        <h1 :class="[{'green-overline': headingObj.greenOverline}]">
          {{ headingObj.heading }}
        </h1>
        <span>{{ tagline }}</span>
      </div>

      <div v-if="heroImage" class="hero-image lg:max-w-4/12 max-w-7/12 flex justify-center pt-8 sm:pt-8 md:pt-8 lg:px-3 lg:pt-0">
        <OpalThree />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { $urlFor } = useNuxtApp()
interface Props {
  headingObj: {
    heading: string;
    greenOverline: string;
  };
  tagline?: string;
  bgColor?: {
    hex: string;
  };
  textColor?: {
    hex: string;
  };
  bgImage?: {
    asset: {
      _ref: string;
      _type: string;
    },
    alt: string;
  };
  heroImage?: {
    asset: {
      _ref: string;
      _type: string;
    },
    alt: string;
  };
}
const props = defineProps<Props>()
const heroBgImage = ref('')

function getHeroImage () {
  if (!props.bgImage) { return }
  const width = window.innerWidth
  const isMobile = width < 768
  const isTablet = width < 1024
  const isDesktop = width >= 1024

  if (isMobile) { return $urlFor(props.bgImage.asset._ref).width(768).height(400).url() }
  if (isTablet) { return $urlFor(props.bgImage.asset._ref).width(1024).height(500).url() }
  if (isDesktop) { return $urlFor(props.bgImage.asset._ref).width(1920).height(500).url() }
}
function setHeroImage () {
  heroBgImage.value = getHeroImage() ?? ''
}
onMounted(() => {
  setHeroImage()
  window.addEventListener('resize', setHeroImage)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', setHeroImage)
})
</script>
<style lang="scss" scoped>
.hero {
  width: 100%;
  position: relative;
  color: #fff;
  background-size: cover;
  img {
    width: 100%;
  }
  .inner-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 3rem 0;
    .hero-image {
      width: 100%;
    }
  }
}
</style>
