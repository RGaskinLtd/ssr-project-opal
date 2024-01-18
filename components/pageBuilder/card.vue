<template>
  <div class="card profile bg-primary w-full text-white md:w-[calc((100%-4rem)/3)]">
    <div v-if="title" class="card-title">
      {{ title }}
    </div>
    <div v-if="content || heading" class="card-content">
      <h4 v-if="heading" class=" font-main green-underline">
        {{ heading }}
      </h4>
      <p v-if="content" class="smaller">
        {{ content }}
      </p>
    </div>
    <div v-if="cta" class="card-links">
      <a class="link-with-arrow uppercase" :href="cta?.link">{{ cta?.text }}</a>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  cardBgColor?: { hex: string };
  cardTextColor?: { hex: string };
  title?: string;
  heading?: string;
  content?: string;
  cta?: {
    link: string;
    text: string;
  }
}
const props = defineProps<Props>()
</script>
<style>
:root {
  --borderRadius: 5px;
}
</style>
<style lang="scss" scoped>

.card {
  position: relative;
  // width: calc((100% - 4rem) / 3);
  box-sizing: border-box;
  border-radius: var(--borderRadius);
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  // @media(max-width: 1024px) { width: calc(100%); }
  // @media(max-width: 768px) { width: 100%; }
  h4, p {width: 100%; text-align: left;}
  &.profile {
    .card-content { padding-top: 5rem; }
  }
  .card-title{
    position: absolute;
    top: 18px;
    left: 0;
    z-index: 2;
    background: #000;
    color: #fff;
    font-family: 'Montserrat','Poppin',sans-serif;
    font-weight: bold;
    padding: 7px 40px 7px 9px;
    border-radius: 0 var(--borderRadius) var(--borderRadius) 0;
    display: inline-block;
  }
  .card-content {
    padding: 0 18px;
    padding-top: calc(18px + 1rem);
    padding-bottom: 1rem;
    -webkit-flex-grow: 1;
    flex-grow: 1;
  }
  .card-links {
    padding: 0 18px 18px 18px;
    .link-with-arrow::after {
      border: solid var(--textColor);
      border-width: 0 3px 3px 0;
    }
  }
  img {
    width: 100%;
    position: relative;
    bottom: -5px;
    left: 0px;
    border-radius: 0 0 3.5872px 3.5872px;
  }
}
</style>
