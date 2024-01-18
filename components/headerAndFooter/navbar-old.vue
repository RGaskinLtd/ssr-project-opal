<template>
  <nav
    ref="nav"
    class="transition-duration-300 transition-all"
    :style="{
      '--primaryNavColor': rgbStringFromObj(navBarSettings.primaryNavColor),
      '--secondaryNavColor': rgbStringFromObj(navBarSettings.secondaryNavColor)
    }"
  >
    <Menubar class="max-wrapper transition-duration-300 transition-all" :model="navBarItems">
      <template #start>
        <a :href="navBarSettings.logoObj.link">
          <img alt="logo" :src="navBarSettings.logoObj.logo" class="mr-2 max-h-12">
        </a>
      </template>
      <template v-if="navBarSettings?.contactUsObj?.enabled" #end>
        <a
          v-if="navBarSettings?.contactUsObj?.link || navBarSettings?.contactUsObj?.text"
          class="btn"
          :style="{
            'background-color': '#fff',
            'color': '#000'
          }"
          :href="navBarSettings?.contactUsObj?.link"
        >{{ navBarSettings?.contactUsObj?.text }}</a>
      </template>
    </Menubar>
  </nav>
</template>
<script setup lang="ts">
import { RGBObj } from '~/utils/color'
const nav = ref(null)

interface navBarItem {
  label: string;
  to: string;
  items?: navBarItem[];
}
interface NavBarSettings {
  primaryNavColor: RGBObj;
  secondaryNavColor: RGBObj;
  logoObj: {
    logo: string;
    link: string;
  }
  contactUsObj: {
    enabled: boolean;
    text: string;
    link: string;
  }
}
const navBarQuery = groq`*[_type == "settings"] {
  'navSettings': navSettings {
    'primaryNavColor': defaultBgColor.rgb,
    'secondaryNavColor': secondaryBgColor.rgb,
    'logoObj': logoObj {
      'logo': logo.asset->url,
      'link': select(
        link->slug.current == '/' => link->slug.current,
        link->slug.current != '/' => '/'+link->slug.current,
      ),
    },
    'navItems': menuItems[]->{
      'label': title,
      'to': select(
        slug.current == '/' => slug.current,
        slug.current != '/' => '/'+ slug.current,
      ),
      'items': group[]->{
        'label': title,
        'to': select(
          slug.current == '/' => slug.current,
          slug.current != '/' => '/'+ slug.current,
        ),
        'items': group[]->{
          'label': title,
          'to': select(
            slug.current == '/' => slug.current,
            slug.current != '/' => '/'+ slug.current,
          ),
        }
      }
    },
    'contactUsObj': contactUsObj {
        ...,
        'link': select(
          link->slug.current == '/' => link->slug.current,
          link->slug.current != '/' => '/'+link->slug.current,
        )
    }
  }
}`
const navBar = await useSanityQuery(navBarQuery)
const navBarSettings = navBar.data.value[0]?.navSettings as NavBarSettings
const navBarItems = navBar.data.value[0]?.navSettings.navItems as navBarItem[]

function updateNavBar () {
  // const isDesktop = window.innerWidth > 960;
  // if (!isDesktop) return;
  const scrollPos = window.scrollY
  const root = document.documentElement
  const navRef = nav.value as unknown as HTMLElement
  const navHeight = navRef.clientHeight
  if (scrollPos > navHeight) { return root.style.setProperty('--bgColor', rgbStringFromObj(navBarSettings.secondaryNavColor)) }
  root.style.setProperty('--bgColor', rgbStringFromObj(navBarSettings.primaryNavColor))
}

onMounted(() => {
  window.addEventListener('scroll', updateNavBar)
  const root = document.documentElement
  root.style.setProperty('--bgColor', rgbStringFromObj(navBarSettings.primaryNavColor))
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateNavBar)
})

</script>
<style>
:root {
  --bgColor: --primaryNavColor;
}
</style>
<style lang="scss" scoped>
:deep(){
  .p-menubar {
    background: transparent;
    border: none;
    border-radius: 0;
    justify-content: space-between;
    .p-menubar-root-list {
      @media screen and (max-width: 960px) { background: var(--bgColor) }
    }
    .p-menubar-button {
      &:hover {
        @media screen and (max-width: 960px) { color: #fff; background: rgb(255 255 255 / 20%); }
      }
      @media screen and (max-width: 960px) {
        display: flex;
        width: 2rem;
        height: 2rem;
        color: #fff;
      }
    }
  }
  .p-menubar .p-menubar-root-list>.p-menuitem>.p-menuitem-content .p-menuitem-link .p-menuitem-text {
    color: #fff;
  }
  .p-menubar .p-menubar-root-list>.p-menuitem>.p-menuitem-content .p-menuitem-link .p-submenu-icon {
    color: #ffffff;
    margin-left: 0.5rem;
  }
  .p-menubar .p-menuitem.p-highlight>.p-menuitem-content {
    color: #ffffff;
    background: rgb(255 255 255 / 20%);
  }
  .p-menubar .p-menuitem.p-highlight.p-focus>.p-menuitem-content {
    background: rgb(255 255 255 / 20%);
  }
  .p-menubar .p-menubar-root-list>.p-menuitem>.p-menuitem-content {
    border-radius: 0;
  }
  .p-menubar .p-menuitem.p-highlight>.p-menuitem-content .p-menuitem-link .p-menuitem-text {
    color: #fff;
  }
  .p-menubar .p-menubar-end {
    margin-left: 0;
  }
  .btn {
    text-transform: uppercase;
    padding: 0.75rem 1.25rem;
  }
}
nav {
  position: sticky;
  top: 0;
  z-index: 99;
  background-color: var(--bgColor);
  color: #fff;
}
</style>
