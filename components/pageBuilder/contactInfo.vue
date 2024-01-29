<template>
  <div :class="['contact-us py-12', themeStyles(theme)]">
    <div class="max-wrapper gutter flex flex-wrap">
      <div class="header w-full md:px-2 md:py-6">
        <BlockContent :content="header" />
      </div>
      <div class="info flex w-full flex-wrap pt-8">
        <div class="w-full md:mx-4 md:w-[calc(50%-2rem)] lg:w-[calc(100%/3-2rem)]">
          <p class="larger mb-8">
            Get in touch with us to learn how we can assist your organisation in achieving its sustainability goals
          </p>
          <POButton class="shadow" btn-style="ev" color="black" uppercase link="mailto:helpdesk@evident.global">
            Email
          </POButton>
        </div>
        <div class="flex w-full flex-wrap md:w-6/12 lg:w-8/12">
          <div class="info-block bg-dark text-secondary my-4 w-full px-8 py-16 lg:mx-4 lg:my-0 lg:w-[calc(50%-2rem)]">
            <BlockContent :content="infoBlockOne" />
          </div>
          <div class="info-block bg-dark text-secondary my-4 w-full px-8 py-16 lg:mx-4 lg:my-0 lg:w-[calc(50%-2rem)]">
            <BlockContent :content="infoBlockTwo" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { BlockContent, Theme } from 'types'

interface Props {
  theme: Theme;
  header: BlockContent;
  infoBlockOne: BlockContent;
  infoBlockTwo: BlockContent;
}
defineProps<Props>()
</script>
<style lang="scss" scoped>
:deep() {
  .info-block {
    a { @apply text-secondary }
  }
}
</style>
