<template>
  <div
    :class="['relative w-full py-4 lg:p-4', themeStyles(theme)]"
  >
    <div :class="['max-wrapper', {readable}]">
      <BlockContent
        v-if="mainContent"
        :content="mainContent"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { BlockContent, Theme } from 'types'
interface Props {
  theme: Theme;
  readable?: boolean;
  mainContent?: BlockContent;
}
defineProps<Props>()
</script>
