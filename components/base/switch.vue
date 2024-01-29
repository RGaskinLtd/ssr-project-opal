<template>
  <div class="switch-con">
    <label :class="['switch relative inline-block h-[26px] w-[46px]', {'switch__disabled': disabled}]">
      <input
        :id="id"
        class="size-0 opacity-0"
        :value="modelValue"
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      >
      <span class="slider round" />
    </label>
    <label class="ml-3 text-sm" :for="id">
      <slot />
    </label>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
interface Props {
  modelValue: boolean;
  id: string;
  disabled?: boolean;
}
defineProps<Props>()
</script>
<style lang="scss" scoped>
.switch input[type="checkbox"]:checked + .slider {
  background-color: #38c172;
}

.switch input[type="checkbox"]:focus + .slider {
  box-shadow: 0 0 1px #38c172;
}

.switch input[type="checkbox"]:checked + .slider:before {
  -webkit-transform: translateX(18px);
  -ms-transform: translateX(18px);
  transform: translateX(18px);
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 3px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
