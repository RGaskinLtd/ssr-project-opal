<template>
  <nav ref="nav" class="transition-all transition-duration-300">
    <Menubar class="max-wrapper transition-all transition-duration-300" :model="navLinks">
      <template #start>
          <img alt="logo" src="~/assets/images/logo/logo.png" class="mr-2 max-h-12" />
      </template>
    </Menubar>
  </nav>
</template>
<script setup lang="ts">
interface NavItem {
  label: string;
  to?: string;
  items?: NavItem[]
}
interface SubMenu {
  title: string;
  group: string[];
}

const nav = ref(null);

const pagesQuery = groq`*[_type == "page" && slug.current != "/" && !(_id in path('drafts.**'))]{ 'label': title, 'to': slug.current }`;
const pages = await useSanityQuery(pagesQuery);

const navBarQuery = groq`*[_type == "settings"] {
  'primaryNavColor': defaultBgColor.hex,
  'secondaryNavColor': secondaryBgColor.hex,
  'navItems': menuItems[]->{
    title,
    'slug': slug.current,
    'group': group[]->{
      title,
      'slug': slug.current,
    }
  }
}`;
const submenus = await useSanityQuery(navBarQuery);

const pagesData = pages.data.value as NavItem[];
const submenuData = submenus.data.value as SubMenu[];

function addSubmenu({
  links = [] as NavItem[],
  item = { label: '', to: '' } as NavItem,
  itemsInSubmenu = [] as string[],
  subMenuTitle = ''
}) {
  const linksCopy = [...links];
  const slug = item?.to ?? '';

  // Function Guards
  if (!itemsInSubmenu.length) return;
  if (!itemsInSubmenu.includes(slug)) return;

  // Function Logic
  const itemsInSubmenuItemIndex = linksCopy.findIndex((link: NavItem) => link.items && link.label === subMenuTitle);
  if (itemsInSubmenuItemIndex !== -1) linksCopy[itemsInSubmenuItemIndex].items?.push(item);
  else linksCopy.push({ label: subMenuTitle, items: [item] });

  return linksCopy;
}
const navLinks = computed(() => {
  let links: NavItem[] = [];

  const skipItems = [] as string[];
  pagesData.forEach((item) => {
    submenuData.forEach(submenu => {
      const newLinks = addSubmenu({ links, item, itemsInSubmenu: submenu.group, subMenuTitle: submenu.title })
      if (!newLinks) return;
      if (item.to) skipItems.push(item.to);
      links = newLinks;
    })
    if (item.to && skipItems.includes(item.to)) return;
    links.push(item)
  })
  return links;
})

function updateNavBar() {
  // const isDesktop = window.innerWidth > 960;
  // if (!isDesktop) return;

  const scrollPos = window.scrollY;
  const root = document.documentElement;
  const navRef = nav.value as unknown as HTMLElement
  const navHeight = navRef.clientHeight;
  if (scrollPos > navHeight) return root.style.setProperty('--bgColor', 'rgb(0 0 0 / 87%)')
  root.style.setProperty('--bgColor', '#3700b3')
}

onMounted(() => {
  window.addEventListener('scroll', updateNavBar);
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateNavBar);
})

</script>
<style>
:root {
  --bgColor: #3700b3;
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
}
nav {
  position: sticky;
  top: 0;
  z-index: 99;
  background-color: var(--bgColor);
  color: #fff;
  .desktop-menu {
    position: relative;
    padding: 2rem 1rem;
    display: flex;
    justify-content: space-between;
    a {
      text-transform: uppercase;
      color: #F7EEE2;
      text-decoration: none;
    }
    .links {
      .nav-link {
        padding: 0 1rem;
        &:hover {
          a {
            color: #0CCDA3;
          }
        }
      }
    }
  }
}
</style>
