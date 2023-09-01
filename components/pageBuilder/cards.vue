<template>
  <div :class="['cards', {'skewed-background': skewedBackground}]" :style="[{'color': cardTextColor?.hex},{'--bgColor': backgroundColor?.hex}, {'background-color': !skewedBackground ? backgroundColor?.hex : ''}]">
    <div class="internal-wrapper max-wrapper">
      <h1 v-if="title">{{ title }}</h1>
      <div class="cards-con" v-if="cards?.length">
        <Card v-for="card in cards" :key="card._key" v-bind="{...card, cardBgColor, cardTextColor}"/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  skewedBackground?: boolean;
  backgroundColor?: { hex: string };
  cardBgColor?: { hex: string };
  cardTextColor?: { hex: string };
  title?: string;
  cards?: [{
    heading: string;
    tagline: string;
    image: {
      asset: {
        _ref: string;
        _type: string;
      },
      alt: string;
    };
    cta: {
      href: string;
      text: string;
    }
    _key: string;
  }]
}
const props = defineProps<Props>()
</script>
<style lang="scss" scoped>
.cards {
  width: 100%;
  position: relative;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  justify-content: center;
  padding: 2rem 0;
  &.skewed-background {
    &::before {
      background-color: var(--bgColor);
    }
    .internal-wrapper {
      position: relative;
      top: -5rem;
    }
  }
  .internal-wrapper {
    display: flex;
    flex-wrap: wrap;
    width: calc(100% - 4rem);
    justify-content: center;
    h1 { margin-top: 0; margin-bottom: 1rem; }
    .cards-con {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
      justify-content: space-between;
    }
  }
}
</style>
