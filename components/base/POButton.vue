<template>
  <component
    v-bind="$attrs"
    :is="getLinkType"
    :to="link"
    :class="[buttonStyle, { uppercase }, color, buttonSize, {'cliped-corner relative': btnStyle === 'po'}]"
    :target="isExternal ? '_blank' : '_self'"
    @click="() => action || null"
  >
    <slot />
  </component>
</template>
<script setup lang="ts">
interface Props {
  uppercase?: boolean;
  btnStyle?: 'arrow' | 'po';
  size?: 'normal' | 'sm' | 'xs';
  link?: string | null;
  action?: Function | null;
  color?: 'green' | 'opal' | 'solid-opal';
}
const props = withDefaults(
  defineProps<Props>(),
  {
    link: null,
    action: null,
    color: 'opal',
    btnStyle: 'po',
    size: 'normal'
  })
const buttonStyle = computed(() => {
  return props.btnStyle === 'arrow' ? 'link-with-arrow' : 'link-button'
})
const buttonSize = computed(() => {
  if (props.btnStyle === 'arrow') { return }
  return props.size
})
const isExternal = computed(() => {
  return ['http://', 'https://'].some(scheme => props.link?.includes(scheme))
})
const getLinkType = computed(() => {
  if (props.link) { return defineNuxtLink({}) }
  return 'button'
})
</script>
<style lang="scss" scoped>
.link-with-arrow {
  @apply font-main;
  display: inline-block;
  margin: 1rem 0 0;
  position: relative;
  font-size: 0.875rem;
  font-weight: 700;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1.75px;
  &:hover {
    text-decoration: none;
  }
  &::after {
    content: '';
    border: solid white;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    margin-left: 5px;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
  &.green {
    @apply text-secondary;
    &:hover, &:focus, &::after, &::before {
      @apply text-secondary;
    }
  }
  &.black {
    @apply text-black;
    &:hover, &:focus, &::after, &::before {
      @apply text-black;
    }
  }
}
.link-button {
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  padding: 22px;
  text-decoration: none !important;
  text-transform: uppercase;
  letter-spacing: 1.75px;
  width: 100%;
  text-align: center;
  max-width: 422px;
  vertical-align: middle;
  @apply font-main;
  &.sm {
    padding: 15px 22px;
  }
  &.xs {
    padding: 5px 10px;
  }
  &.green {
    background: transparent;
    @apply text-main;
    border: 4px solid;
    @apply border-secondary;
    &:hover,&:focus {
      @apply bg-secondary;
      @apply text-main;
    }
  }
  &.opal {
    @apply bg-accent;
    @apply text-main;
    clip-path: polygon(calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%, 0 0);
    &::before {
      @apply bg-background;
      clip-path: polygon(calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%, 0 0);
    }
    &:hover,&:focus {
      @apply bg-accent;
      @apply text-main;
      &::before {
        @apply bg-accent;
        clip-path: polygon(calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%, 0 0);
      }
    }
  }
  &.solid-opal {
    @apply bg-accent;
    @apply text-white;
    clip-path: polygon(calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%, 0 0);
    &::before {
      @apply bg-accent;
      clip-path: polygon(calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%, 0 0);
    }
    &:hover,&:focus {
      @apply bg-accent;
      @apply text-main;
      &::before {
        @apply bg-accent;
        clip-path: polygon(calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%, 0 0);
      }
    }
  }
}
</style>
