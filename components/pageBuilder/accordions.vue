<template>
  <div :class="[themeStyles(theme), 'py-8']">
    <div :class="['max-wrapper', { readable }]">
      <div v-if="title" class="title pb-4">
        <BlockContent :content="title" />
      </div>

      <div class="accordionsGroup">
        <BlockContent v-if="accordionsGroup.title" :content="accordionsGroup.title" />
        <Accordion
          v-for="(item, index) in accordionsGroup.accordions"
          :key="index"
          v-bind="{...item}"
          :theme="theme"
          :display-count="displayCount"
          :count-number="index + 1"
          :max-number="accordionsGroup.accordions.length"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { BlockContent, Accordions, Theme } from '~/types'

interface AccordionList {
  title?: BlockContent | null;
  readable?: boolean;
  theme: Theme;
  accordionsGroup: {
    title: BlockContent;
    accordions: Accordions;
  }
  displayCount: boolean;
}
withDefaults(
  defineProps<AccordionList>(),
  { title: null, readable: true, theme: 'light' }
)
</script>
