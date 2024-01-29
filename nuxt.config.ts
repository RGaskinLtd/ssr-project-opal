// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: process.env.NUXT_NODE_ENV === 'prod',
  experimental: {
    payloadExtraction: false
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }]
    }
  },
  modules: ['@nuxtjs/sanity', '@nuxtjs/eslint-module', 'nuxt-simple-robots'],
  runtimeConfig: {
    sanity: {
      token: process.env.NUXT_SANITY_TOKEN
    }
  },
  sanity: {
    projectId: process.env.NUXT_SANITY_PROJECT,
    dataset: 'production',
    apiVersion: 'v2021-10-21',
    useCdn: false,
    withCredentials: true
  },
  css: [
    '~/assets/css/global.css'
  ],
  components: [{ path: '~/components', pathPrefix: false }],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      'tailwindcss/nesting': {},
      'postcss-simple-vars': {}
    }
  }
})
