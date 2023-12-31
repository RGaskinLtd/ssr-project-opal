// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/sanity'],
  runtimeConfig: {
    sanity: {
      token: process.env.NUXT_SANITY_TOKEN,
    },
  },
  sanity: {
    projectId: process.env.NUXT_SANITY_PROJECT,
    dataset: 'production',
    apiVersion: 'v2021-10-21',
    useCdn: false,
    withCredentials: true,
  },
  css: [
    '~/assets/css/global.css',
    '~/assets/css/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css',
    // 'primeflex/primeflex.css'
  ],
  build: {
    transpile: ["primevue"]
  },
  components: [{ path: '~/components', pathPrefix: false }],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      'postcss-simple-vars': {}
    },
  },
})
