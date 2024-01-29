<template>
  <div>
    <div class="contact-us font-main">
      <h4>
        Contact Us
      </h4>
      <div class="addr">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="icon size-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>

        <div class="mt-2 w-full sm:mt-0 sm:w-auto [&>p]:!text-[16px]">
          <BlockContent
            v-if="contactUs.address"
            :content="contactUs.address"
          />
        </div>
      </div>
      <div class="email mt-4">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="icon size-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>

        <a
          v-if="contactUs?.email"
          class="mt-2 w-full hover:underline sm:mt-0 sm:w-auto"
          :href="`mailto:${contactUs.email}`"
        >{{ contactUs.email }}</a>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PortableTextBlock, PortableTextMarkDefinition, ArbitraryTypedObject, PortableTextSpan } from '@portabletext/types'
type SanityContent = PortableTextBlock<PortableTextMarkDefinition, ArbitraryTypedObject | PortableTextSpan, string, string>[];
interface ContactUs {
  address: SanityContent;
  email: string;
}
interface Props {
  contactUs: ContactUs
}
const props = defineProps<Props>()
</script>
<style lang="scss" scoped>
  a {
    @apply text-secondary hover:text-secondary
  }
  .addr, .email {
    @apply relative sm:left-[30px] flex flex-wrap left-0 sm:flex-nowrap
  }
  .icon {
    @apply relative left-0 sm:mr-[10px] sm:absolute sm:left-[-30px] sm:top-0 sm:text-[1.3rem]
  }
</style>
