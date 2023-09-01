<template>
  <footer class="transition-all transition-duration-300" :style="{
    'background-color': rgbStringFromObj(footerSettings.bgColor),
    'color': rgbStringFromObj(footerSettings.textColor)
  }">
    <div class="info max-wrapper">
      <div class="social-icons">
        <a v-if="footerSettings.socialLinks.linkedin" :href="footerSettings.socialLinks.linkedin"><i class="pi pi-linkedin"/></a>
        <a v-if="footerSettings.socialLinks.github" :href="footerSettings.socialLinks.github"><i class="pi pi-github"/></a>
        <a v-if="footerSettings.socialLinks.facebook" :href="footerSettings.socialLinks.facebook"><i class="pi pi-facebook"/></a>
      </div>
      <div class="nav-items">
        <a class="nav-link mx-2" v-for="item in navItems" :href="item.to">{{ item.label }}</a>
      </div>
    </div>
    <div class="copyright max-wrapper">
      <span>Copyright © {{ currentYear() }}   {{ footerSettings.copyright }}</span>
    </div>
  </footer>
</template>
<script setup lang="ts">
import { RGBObj } from '~/utils/color';

interface NavItem {
  label: string;
  to: string;
  items?: NavItem[];
}
interface Footer {
  bgColor: RGBObj;
  textColor: RGBObj;
  socialLinks: {
    github: string;
    facebook: string;
    linkedin: string;
  }
  copyright: string;
}
const footerQuery = groq`*[_type == "settings"] {
  'navItems': navSettings.menuItems[]->{
    'label': title,
    'to': select(
      page->slug.current != null && page->slug.current == '/' => page->slug.current,
      page->slug.current != null && page->slug.current != '/' => page->slug.current,
      slug.current == '/' => slug.current,
      slug.current != '/' => '/'+ slug.current,
    ),
  },
  'footer': footer {
    ...,
    'bgColor': bgColor.rgb,
    'textColor': textColor.rgb,
  }
}`;
const footer = await useSanityQuery(footerQuery);
const footerSettings = footer.data.value[0].footer as Footer
const navItems = footer.data.value[0].navItems as NavItem[];

const currentYear = () => {
  return new Date().getFullYear();
}


</script>
<style lang="scss" scoped>
footer {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
  .info {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
    .social-icons {
      a { margin: 0 0.5rem; }
    }
    .nav-items {
      .nav-link {
        font-size: 1rem;
      }
    }
  }
  .copyright {
    width: 100%;
    display: flex;
    justify-content: center;
    span {
      font-size: 0.75rem;
    }
  }
}
</style>
