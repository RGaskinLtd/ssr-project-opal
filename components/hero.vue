<template>
  <div class="hero" :style="{
    'background-color': bgColor?.hex,
    'background-image': `url(${heroImage ? heroImage : ''})`
    }">
    <div class="inner-wrapper max-wrapper">
      <div class="text-overlay lg:max-w-60 px-3">
        <h1>{{ heading }}</h1>
        <span>{{ tagline }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { $urlFor } = useNuxtApp()
interface Props {
  heading: string;
  tagline?: string;
  bgColor?: {
    hex: string;
  };
  image?: {
    asset: {
      _ref: string;
      _type: string;
    },
    alt: string;
  };
}
const props = defineProps<Props>()

const heroImage = ref('');

function getHeroImage() {
  if(!props.image) return;
  const width = window.innerWidth;
  const isMobile = width < 768;
  const isTablet = width < 1024;
  const isDesktop = width >= 1024

  if (isMobile) return $urlFor(props.image.asset._ref).width(768).height(400).url();
  if (isTablet) return $urlFor(props.image.asset._ref).width(1024).height(500).url();
  if (isDesktop) return $urlFor(props.image.asset._ref).width(1920).height(500).url();
}
function setHeroImage() {
  heroImage.value = getHeroImage() ?? '';
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
    justify-content: start;
    align-items: center;
    padding: 3rem 0;
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
