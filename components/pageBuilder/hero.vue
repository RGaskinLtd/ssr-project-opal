<template>
  <div class="hero" :style="{
    'background-color': bgColor?.hex,
    'color': textColor?.hex ?? '#fff',
    'background-image': `url(${heroBgImage ?? ''})`
    }">
    <div :class="['inner-wrapper max-wrapper', {'justify-around': heroImage?.asset}, {'justify-start': !heroImage?.asset}]">
      <div class="text-overlay w-full sm:w-full md:w-full lg:max-w-60 px-3">
        <h1 :class="{'green-overline': headingObj.greenOverline}">{{ headingObj.heading }}</h1>
        <span>{{ tagline }}</span>
      </div>
      <div v-if="heroImage" class="hero-image max-w-60 pt-8 sm:pt-8 md:pt-8 lg:px-3 lg:pt-0 lg:max-w-30">
        <img v-if="heroImage.asset" :src="$urlFor(heroImage.asset._ref).url()" :alt="heroImage.alt"/>
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
const heroBgImage = ref('');

function getHeroImage() {
  if(!props.bgImage) return;
  const width = window.innerWidth;
  const isMobile = width < 768;
  const isTablet = width < 1024;
  const isDesktop = width >= 1024

  if (isMobile) return $urlFor(props.bgImage.asset._ref).width(768).height(400).url();
  if (isTablet) return $urlFor(props.bgImage.asset._ref).width(1024).height(500).url();
  if (isDesktop) return $urlFor(props.bgImage.asset._ref).width(1920).height(500).url();
}
function setHeroImage() {
  heroBgImage.value = getHeroImage() ?? '';
}
onMounted(() => {
  setHeroImage()
  window.addEventListener('resize', setHeroImage);
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', setHeroImage);
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
    // &.has-image {
    //   position: absolute;
    // top: 0;
    // left: 0;
    // }
    h1 {
      font-size: 4rem;
      line-height: 4.5rem;
      @media (max-width: 1440px) {
        font-size: 3rem;
        line-height: 3.5rem;
      }
      @media (max-width: 1024px) {
        font-size: 3rem;
        line-height: 3.5rem;
      }
      @media (max-width: 768px) {
        font-size: 3rem;
        line-height: 3.5rem;
      }

    }
  }
}
</style>
