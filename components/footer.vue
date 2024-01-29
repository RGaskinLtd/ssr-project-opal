<template>
  <footer
    class="bg-background-800 text-white"
  >
    <div class="md:py-[3rem]">
      <div class="max-wrapper footer font-main flex flex-row flex-wrap text-base md:gap-x-4 md:gap-y-8 lg:flex-nowrap lg:gap-8">
        <FooterInfo class="footerSection" :info-content="footer.infoContent" :social-links="footer.socialLinks" />
        <FooterNav class="footerSection lg:ml-1/12" :nav-items="footer.navItems" />
        <FooterContactUs class="footerSection" :contact-us="footer.contactUs" />
        <FooterLogo class="basis-full pt-6 md:basis-[calc(50%-0.5rem)] md:pt-0 lg:basis-1/6 lg:text-right" :logo="footer.logo" :back-to-top="footer.backToTop" />
      </div>
    </div>
    <FooterCopyright
      class="border-divided bg-darker border-t-[1px] text-white"
      :logo="copyright.logo"
      :legal-items="copyright.legalItems"
    />
  </footer>
</template>
<script setup lang="ts">
import type { PortableTextBlock, PortableTextMarkDefinition, ArbitraryTypedObject, PortableTextSpan } from '@portabletext/types'
type SanityContent = PortableTextBlock<PortableTextMarkDefinition, ArbitraryTypedObject | PortableTextSpan, string, string>[];
interface NavItem {
  label: string;
  to: string;
}
interface ContactUs {
  address: SanityContent;
  email: string;
}
interface Footer {
  infoContent: SanityContent;
  socialLinks: {
    linkedIn: string;
    twitter: string;
  }
  navItems: NavItem[];
  contactUs: ContactUs;
  logo: string;
  backToTop: boolean;
}
interface Copyright {
  legalItems: NavItem[];
  logo: string;
}
const query = groq`*[_type == "settings"][0] {
  'footer': footer {
    ...,
    defined(logo) => {
      'logo': logo.asset->url
    },
    'navItems': navItems[]->{
      'label': title,
      'to': select(
        slug.current == '/' => slug.current,
        slug.current != '/' => '/'+slug.current,
      ),
    },
  },
  'copyright': copyright {
    ...,
    defined(logo) => {
      'logo': logo.asset->url
    },
    'legalItems': legalItems[]->{
      'label': title,
      'to': select(
        slug.current == '/' => slug.current,
        slug.current != '/' => '/'+slug.current,
      ),
    },
  }
}`
const { data, error } = await useSanityQuery(query)
if (!data.value?.footer || error.value) { throw createError({ statusCode: 404, fatal: true }) }

const footer = data.value?.footer as Footer
const copyright = data.value?.copyright as Copyright
</script>

<style lang="scss" scoped>
.max-wrapper {
  @apply py-8 px-4 sm:px-6;
}
.footerSection {
  @apply basis-full pt-6 md:basis-[calc(50%-0.5rem)] md:pt-0 lg:basis-1/4
}
</style>
