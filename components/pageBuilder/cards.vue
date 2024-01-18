<template>
  <div :class="['cards bg-background pb-12 pt-0 text-white md:pb-28 md:pt-16']">
    <div class="internal-wrapper max-wrapper">
      <h1 v-if="title" class="mb-12">
        {{ title }}
      </h1>
      <div v-if="cards?.length" class="cards-con">
        <Card v-for="card in cards" :key="card._key" v-bind="{...card, cardBgColor, cardTextColor}" />
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
  .internal-wrapper {
    display: flex;
    flex-wrap: wrap;
    //width: calc(100% - 4rem);
    justify-content: center;
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
