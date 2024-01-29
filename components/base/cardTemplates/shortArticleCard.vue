<template>
  <Card :card-shadow="true" :cta="cta" :title="title" :skewed-background="skewedBackground" :theme="theme">
    <div
      v-if="content || heading"
    >
      <h4
        v-if="heading"
        class="green-underline w-full font-bold"
      >
        {{ heading }}
      </h4>
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
  title?: string;
  heading?: string;
  content?: BlockContent;
  cta?: CTA;
}

defineProps<Props>()
</script>
