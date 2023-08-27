<template>
  <div class="card profile">
    <div v-if="title" class="card-title">{{ title }}</div>
    <div v-if="content || heading" class="card-content">
      <h4 v-if="heading" class="green-underline">{{ heading }}</h4>
      <p v-if="content" class="smaller">{{ content }}</p>
    </div>
    <div v-if="cta" class="card-links">
      <a class="link-with-arrow uppercase" download :href="cta?.href">{{ cta?.text }}</a>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  title?: string;
  heading?: string;
  content?: string;
  cta?: {
    href: string;
    text: string;
  }
}
const props = defineProps<Props>()
</script>
<style lang="postcss" scoped>

</style>
<style lang="scss" scoped>
.card {
  position: relative;
  width: calc((100% - 4rem) / 3);
  box-sizing: border-box;
  background-color: #fff;
  color: #000;
  border-radius: 3.5872px 115px 3.5872px 3.5872px;
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  @media(max-width: 1024px) { width: calc((100% - 2rem) / 2); }
  @media(max-width: 768px) { width: 100%; }
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
    font-family: 'EvidentGrotesk-Bold';
    padding: 7px 40px 7px 9px;
    border-radius: 0 21px 0 0;
    display: inline-block;
  }
  .card-content {
    padding: 0 18px;
    padding-top: calc(18px + 1rem);
    padding-bottom: 1rem;
    -webkit-flex-grow: 1;
    flex-grow: 1;
    h4 {
      font-size: 2.1875rem;
      line-height: 2.5rem;
      font-family: 'EvidentGrotesk-Bold';
    }
  }
  .card-links {
    padding: 0 18px 18px 18px;
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
