<template>
  <div :class="['solo-cta pb-8', themeStyles(theme)]">
    <div
      :class="[
        'max-wrapper flex',
        { readable },
        {'justify-start': position === 'left'},
        {'justify-center': position === 'center'},
        {'justify-end': position === 'right'}
      ]"
    >
      <BlockContent v-if="ctaContent" :content="ctaContent" />
      <POButton
        class="mt-2"
        :btn-style="cta.style"
        :color="cta.color"
        :uppercase="true"
        :link="cta?.[cta.linkType]"
      >
        {{ cta.text }}
      </POButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { BlockContent, Theme } from '~/types'

interface SoloCTA {
  readable: boolean;
  ctaContent?: BlockContent | null;
  position: 'left' | 'center' | 'right'
  cta: CTA;
  theme: Theme;
}
withDefaults(
  defineProps<SoloCTA>(),
  { readable: false, theme: 'light', ctaContent: null }
)
</script>
