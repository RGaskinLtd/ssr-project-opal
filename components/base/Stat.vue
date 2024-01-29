<template>
  <div
    :class="['relative box-border w-full', themeStyles(theme)]"
  >
    <div
      v-if="value"
      class="flex flex-wrap items-center justify-center whitespace-normal py-4 text-[30px] lg:text-[60px]"
    >
      <UseElementVisibility
        v-slot="{ isVisible }"
        class="flex flex-wrap items-center justify-center"
      >
        <div class="mb-[10px] flex w-full justify-center">
          <span
            v-if="isVisible"
            v-element-visibility="updateNumber"
            class="text-[30px] font-bold leading-none transition-all duration-300 lg:text-[60px]"
            :data-value="value"
          >{{ numAnimation.number.toFixed(0) }}</span>
          <small
            v-if="unit"
            class="pl-2 text-[30px] font-bold leading-none transition-all duration-300 lg:text-[60px]"
          >{{ unit }}</small>
        </div>
        <sup v-if="info" class="text-base font-light leading-none">{{ info }}</sup>
      </UseElementVisibility>
    </div>
  </div>
</template>
<script setup lang="ts">
import gsap from 'gsap'
import { vElementVisibility, UseElementVisibility } from '@vueuse/components'
import type { Theme } from '~/types'
interface Props {
  theme: Theme;
  unit?: string;
  value?: number;
  info?: string;
}
const props = defineProps<Props>()

const statVal = ref(0)
const numAnimation = reactive({
  number: 0
})
watch(statVal, (n) => {
  gsap.to(numAnimation, { duration: 1, number: Number(n) || 0 })
})
function updateNumber () {
  statVal.value = props.value ?? 0
}
</script>
