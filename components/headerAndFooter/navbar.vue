<template>
  <nav
    v-if="navBarSettings"
    id="desktop-menu-con"
    ref="nav"
    aria-label="desktop-menu"
    class="bg-background transition-duration-300 border-secondary sticky top-0 z-[99] flex flex-nowrap items-center justify-between border-b-[1px] border-solid p-4 text-[12px] leading-[12px] text-white transition-all"
  >
    <div class="max-wrapper flex flex-nowrap items-center justify-between !p-0">
      <div v-if="navBarSettings?.logoObj?.logo" id="logo">
        <NuxtLink :to="navBarSettings.logoObj.link">
          <img
            alt="logo"
            width="200px"
            :src="navBarSettings.logoObj.logo"
            class="mr-2 w-[200px]"
          >
        </NuxtLink>
      </div>

      <div id="right" class="flex flex-nowrap items-center">
        <div id="desktop-menu" class="hidden xl:block">
          <div v-if="navBarItems" class="menu-items flex flex-nowrap">
            <div v-for="(item, index) in navBarItems" :key="index" class="nav-link text-secondary tracking-[1.75px]">
              <NuxtLink v-if="!item.items" :to="item.to" class="hover:!text-secondary font-main p-[1em] font-bold uppercase !text-white hover:no-underline">
                {{ item.label }}
              </NuxtLink>

              <div v-if="item.items" class="sub-menu hover:!text-green group relative hover:no-underline">
                <span class="font-main p-[1em] font-bold uppercase">
                  {{ item.label }}
                </span>
                <div class="sub-menu-items text-dark absolute top-[24px] hidden rounded-[5px] bg-white p-2 tracking-wider group-hover:block">
                  <div v-for="(subItem, subIndex) in item.items" :key="subIndex" class="nav-link mb-[3px] flex last:mb-0">
                    <NuxtLink v-if="!subItem.items" :to="subItem.to" active-class="!bg-primary !text-secondary" class="w-full whitespace-nowrap rounded-[5px] p-4">
                      {{ subItem.label }}
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="toggle-btn" class="z-10 ml-8 block sm:ml-0 xl:hidden" @click="toggleMenu({close: false})">
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>
      </div>
    </div>
  </nav>
  <Transition name="slide-in-from-left">
    <nav v-if="showMobileMenu" aria-label="mobile-menu" class="fixed top-0 z-[200] w-full">
      <div id="mobile-menu" ref="mobileNav" class="bg-background sticky top-0 h-[100vh] w-full max-w-[300px] overflow-hidden xl:hidden">
        <header class="flex items-center justify-end">
          <button class="border-0 border-transparent bg-transparent p-[10px]" @click="toggleMenu({close: true})">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="3.5"
              stroke="currentColor"
              class="size-6"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>
        <div v-if="navBarItems" :class="['menu-items max-h-[calc(100%-(1.5rem+20px))] px-4 duration-500', {'translate-x-[calc(-100%-4rem)]': mobileSubMenuToBeShown}, {'overflow-y-auto': showScroll}]">
          <div v-for="(item, index) in navBarItems" :key="index" class="nav-link w-full p-4 text-white">
            <NuxtLink v-if="!item.items" :to="item.to" active-class="!text-accent" class="hover:!text-accent !text-white hover:no-underline" @click="closeMenus()">
              {{ item.label }}
            </NuxtLink>

            <div v-if="item.items" class="sub-menu group w-full hover:no-underline">
              <div class="flex items-center justify-between" @click="toggleMobileSubMenu(item.label)">
                <span class="font-main">{{ item.label }}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
              <Transition name="mobile-sub-menu-slide" @after-leave="toggleScroll" @enter="toggleScroll">
                <div
                  v-if="mobileSubMenuToBeShown === item.label"
                  :data-sub-menu="item.label"
                  class="mobile-sub-menu-items !text-background absolute top-0 w-full translate-x-[calc(100%+2rem)] bg-white p-4 tracking-wider"
                >
                  <header class="border-dark flex items-center justify-start border-b-[1px] py-4 pt-2" @click="toggleMobileSubMenu(item.label)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="mr-2 size-6"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    <span class="font-main">{{ item.label }}</span>
                  </header>
                  <div v-for="(subItem, subIndex) in item.items" :key="subIndex" class="nav-link mb-[3px] flex last:mb-0">
                    <NuxtLink v-if="!subItem.items" :to="subItem.to" active-class="!text-accent" class="w-full whitespace-nowrap p-4" @click="closeMenus()">
                      {{ subItem.label }}
                    </NuxtLink>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </Transition>
  <Transition name="fade">
    <div v-if="showMobileMenu" id="mobile-overlay" class="bg-overlay fixed left-0 top-0 z-[100] size-full cursor-all-scroll xl:hidden" />
  </Transition>
</template>
<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { theme } from '~/tailwind.config.js'

const router = useRoute()

const nav = ref(null)
const mobileNav = ref(null)

const showMobileMenu = ref(false)
const mobileSubMenuToBeShown = ref()
const showScroll = ref(true) // this is needed for the root nav to have scroll when needed but still have the sub menus still work

interface NavBarItem {
  label: string;
  to: string;
  items?: NavBarItem[];
}
interface NavBarSettings {
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

    'primaryNavColor': defaultBgColor,
    'primaryTextColor': defaultTextColor,
    'primaryAccentTextColor': defaultAccentTextColor,

    'secondaryNavColor': secondaryBgColor,
    'secondaryTextColor': secondaryTextColor,
    'secondaryAccentTextColor': secondaryAccentTextColor,

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
        slug.current != '/' => '/'+slug.current,
      ),
      'items': group[]->{
        'label': title,
        'to': select(
          slug.current == '/' => slug.current,
          slug.current != '/' => '/'+slug.current,
        ),
        'items': group[]->{
          'label': title,
          'to': select(
            slug.current == '/' => slug.current,
            slug.current != '/' => '/'+slug.current,
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
const { data, error } = await useSanityQuery(navBarQuery)
if (!data.value[0]?.navSettings || error.value) { throw createError({ statusCode: 404, fatal: true }) }
const navBarSettings = data.value[0].navSettings as NavBarSettings
const navBarItems = data.value[0].navSettings.navItems as NavBarItem[]

function closeMenus () {
  toggleMobileSubMenu('close')
  toggleMenu({ close: true })
  showScroll.value = true
}

onClickOutside(mobileNav, () => {
  closeMenus()
})

function toggleScroll () {
  showScroll.value = !showScroll.value
}

function toggleMenu ({ close }: {close?: boolean}) {
  const navBar = nav.value as unknown as HTMLElement

  const currentWidth = navBar.clientWidth
  const desktopBreakPoint = pxToInt(theme.extend.screens.xl)

  const isMobile = currentWidth < desktopBreakPoint

  const body = document.querySelector('body')
  if (showMobileMenu.value) {
    body?.classList.remove('no-scroll')
  } else {
    body?.classList.add('no-scroll')
  }
  if (close) {
    showMobileMenu.value = false
    body?.classList.remove('no-scroll')
    return
  }
  if (isMobile) { showMobileMenu.value = !showMobileMenu.value }
}

function toggleMobileSubMenu (label: string) {
  if (label === 'close') {
    mobileSubMenuToBeShown.value = null
    return
  }
  mobileSubMenuToBeShown.value = mobileSubMenuToBeShown.value === label ? null : mobileSubMenuToBeShown.value = label
}

watch(
  () => router.params.slug,
  () => closeMenus()
)
onMounted(() => {
  window.addEventListener('resize', closeMenus)
})

</script>
<style lang="scss" scoped>
.nav-link {
  a { text-decoration: none; white-space: nowrap; }
}
.sub-menu-items {
  &::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    display: block;
    top: -10px;
    left: 2em;
    border-bottom: 10px solid #FFF;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
  }
  .nav-link {
    a {
      font-size: 1rem;
      @apply text-background;
      &:hover {
        @apply bg-background;
        @apply text-text;
      }
    }
  }
}
.mobile-sub-menu-items {
  .nav-link {
    a {
      font-size: 1rem;
      @apply text-background;
      &:hover {
        @apply bg-background;
        @apply text-text;
      }
    }
  }
}
</style>
