<template>
  <PortableText
    v-if="content"
    :value="content"
    :components="myPortableTextComponents"
  />
</template>
<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import type { PortableTextComponents } from '@portabletext/vue'
import type { BlockContent } from '~/types'
const { $getImage } = useNuxtApp()
const router = useRouter()
interface Props {
  preventStyles?: boolean;
  preventLinks?: boolean;
  content: BlockContent
}
interface ImageObj {
  align: string;
  image: {
    asset: {
      _ref: string;
    }
  }
}
interface Youtube {
  url: string
}
const props = defineProps<Props>()
const myPortableTextComponents: PortableTextComponents = {
  types: {
    imageObj: ({ value }: { value: ImageObj }) => h('p', {},
      h('img', { class: value.align, src: $getImage(value?.image?.asset?._ref) })
    ),
    youtube: ({ value }: { value: Youtube }) => h('div', { class: 'evVideo' },
      h('iframe', { width: '100%', height: '100%', loading: 'lazy', allow: 'fullscreen', src: value.url })
    )
  },
  marks: {
    link: ({ value }, { slots }: any) => {
      return !props.preventLinks ? h('a', { href: value.href }, slots.default?.()) : h('span', {}, slots.default?.())
    },
    internalLink: ({ value }, { slots }: any) => {
      return !props.preventLinks
        ? h('a', {
          onClick: (e:Event) => {
            e.preventDefault()
            router.push({ path: value.slug })
          },
          href: value.slug
        }, slots.default?.())
        : h('span', {}, slots.default?.())
    }
  },
  block: {
    subtitle: (_:any, { slots }:any) => !props.preventStyles ? h('p', { class: 'subtitle' }, slots.default?.()) : h('p', {}, slots.default?.()),
    larger: (_:any, { slots }:any) => !props.preventStyles ? h('p', { class: 'larger' }, slots.default?.()) : h('p', {}, slots.default?.()),
    smaller: (_:any, { slots }:any) => !props.preventStyles ? h('p', { class: 'smaller' }, slots.default?.()) : h('p', {}, slots.default?.()),
    smallest: (_:any, { slots }:any) => !props.preventStyles ? h('p', { class: 'smallest' }, slots.default?.()) : h('p', {}, slots.default?.()),
    eye_brow: (_:any, { slots }:any) => !props.preventStyles ? h('p', { class: 'font-HeadlineBold !text-sm uppercase tracking-[2px] opacity-80' }, slots.default?.()) : h('p', {}, slots.default?.())
  },
  list: {
    bullet: (_:any, { slots }:any) => !props.preventStyles ? h('ul', { class: 'bullet-list' }, slots.default?.()) : h('ul', {}, slots.default?.()),
    number: (_:any, { slots }:any) => !props.preventStyles ? h('ol', { class: 'number-list' }, slots.default?.()) : h('ol', {}, slots.default?.())
  }
}
</script>
<style lang="scss">
.bullet-list {
  margin: 0;
  padding: 0 0 0 25px;
  list-style-type: disc;
  li {
    margin-bottom: 1rem;
    list-style: none;
    position: relative;
    &::before {
      content: "";
      background-color: #0CCDA3;
      width: 0.5em;
      height: 0.5em;
      border-radius: 1em;
      display: inline-block;
      position: absolute;
      left: -1.425em;
      top: 0.5em;
    }
  }
}

.number-list {
  margin: 0;
  padding: 0 0 0 25px;
  list-style-type: decimal;
  li {
    margin-bottom: 1rem;
    list-style: auto;
  }
}
</style>
