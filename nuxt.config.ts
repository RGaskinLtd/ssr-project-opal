// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/sanity', '@tresjs/nuxt', '@nuxtjs/eslint-module', 'nuxt-simple-robots'],
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
