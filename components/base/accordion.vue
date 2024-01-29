<template>
  <div :class="['accordion cursor-pointer border-b-2 border-solid py-6', themeClasses]" @click="toggleOpen">
    <div class="header flex items-center justify-between">
      <div class="flex flex-nowrap items-center">
        <div v-if="displayCount" class="display-count pr-8 text-[32px] font-bold md:text-[48px]">
          {{ count }}
        </div>
        <div class="content">
          <div v-if="title" class="title text-[16px] font-bold md:text-[24px]">
            {{ title }}
          </div>
          <p v-if="summary" class="summary">
            {{ summary }}
          </p>
        </div>
      </div>

      <div class="toggle cliped-corner flex size-[55px] cursor-pointer items-center justify-center">
        <svg
          v-if="!isOpen"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="size-8"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <svg
          v-if="isOpen"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="size-8"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
        </svg>
      </div>
    </div>
    <transition
      name="accordion"
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <div v-if="isOpen" class="content overflow-hidden py-6 pr-20 transition-all duration-300 ease-in-out">
        <BlockContent v-if="content" :content="content" />
        <POButton v-if="cta && cta.linkType" class="mt-4" v-bind="{...cta}" :link="cta?.[cta.linkType]">
          {{ cta.text }}
        </POButton>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import type { Accordion, Theme } from '~/types'
interface Props extends Accordion {
  theme: Theme;
  displayCount?: boolean;
  countNumber: number;
  maxNumber: number;
}
const props = withDefaults(
  defineProps<Props>(),
  {
    displayCount: false,
    theme: 'light'
  }
)

const isOpen = ref(false)

function toggleOpen () {
  isOpen.value = !isOpen.value
}

function beforeEnter (el: Element) {
  const element = el as HTMLElement
  element.style.height = '0'
}
function enter (el: Element) {
  const element = el as HTMLElement
  element.style.height = el.scrollHeight + 'px'
}
function beforeLeave (el: Element) {
  const element = el as HTMLElement
  element.style.height = el.scrollHeight + 'px'
}
function leave (el: Element) {
  const element = el as HTMLElement
  element.style.height = '0'
}

const count = computed(() => {
  const paddingAmount = props.maxNumber.toString().length
  return String(props.countNumber).padStart(paddingAmount, '0')
})

const themeClasses = computed(() => props.theme === 'light' ? 'border-background' : 'border-accent')
</script>
<style lang="scss" scoped>
.toggle {
  @apply bg-accent relative;
  clip-path: polygon(calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%, 0 0);
  &::before {
    @apply bg-background;
    clip-path: polygon(calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%, 0 0);
  }
}
</style>
