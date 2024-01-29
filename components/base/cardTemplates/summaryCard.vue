<template>
  <Card
    :card-shadow="true"
    :cta="cta"
    card-template="summary"
    :title="title"
    :skewed-background="skewedBackground"
    :theme="theme"
  >
    <div v-if="content || heading">
      <img
        v-if="icon"
        width="90px"
        height="90px"
        :class="['relative bottom-0 left-0 mb-8 w-[40%] max-w-[90px] rounded-[200px] p-2', iconColor]"
        :src="icon"
        alt="icon"
        aria-hidden="true"
      >
      <h3
        v-if="heading"
        class="w-full font-bold"
      >
        {{ heading }}
      </h3>
      <BlockContent v-if="content" :content="content" />
    </div>
  </Card>
</template>
<script setup lang="ts">
import type { BlockContent, Theme } from '~/types'
import type { CTA } from '~/utils/cta'

interface Props {
  theme: Theme;
  skewedBackground?: boolean;
  cardHeaderUnderline?: boolean;
  icon?: string;
  title?: string;
  heading?: string;
  content?: BlockContent;
  cta?: CTA;
}

const props = defineProps<Props>()
const iconColor = computed(() => {
  if (props.theme === 'dark') { return 'bg-white' }
  if (props.theme === 'light') { return 'bg-black' }
  return 'bg-transparent'
})
</script>
