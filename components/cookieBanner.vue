<template>
  <div v-if="!consentGiven" :class="['text-darkText fixed bottom-0 left-0 z-[998] w-full bg-white']">
    <div class="max-wrapper innerWrapper">
      <div class="flex flex-wrap items-center justify-between gap-4 px-6 py-4 md:flex-nowrap">
        <div class="cookie-message mb-4 w-full md:mb-0">
          <p>
            We use cookies to optimise site functionality and enhance your
            experience. To find out more about our use of cookies, please see our
            <NuxtLink to="/cookies">
              cookie policy
            </NuxtLink>
          </p>
        </div>
        <div class="flex w-full flex-wrap justify-center gap-4 sm:flex-nowrap">
          <POButton
            class="w-full"
            size="sm"
            color="solid-black"
            btn-style="ev"
            tabindex="1"
            @click="acceptCookies"
          >
            Accept recommended
          </POButton>
          <POButton
            class="w-full"
            size="sm"
            color="black"
            btn-style="ev"
            tabindex="2"
            @click="manageCookies"
          >
            Manage settings
          </POButton>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showModal" class="modal-container bg-overlayDark fixed left-0 top-0 z-[999] flex size-full items-center justify-center">
    <div class="bg-dark text-secondary relative w-11/12 max-w-[680px] rounded-tr-[25vh] px-8 py-16 md:w-9/12 lg:w-8/12">
      <!-- Content here -->
      <h4>Manage Cookie preferences</h4>
      <p>
        Your changes will take affect when you click "Save &amp; exit" or on next
        page reload.
      </p>
      <p>
        To find out more about our use of cookies, please see our
        <NuxtLink to="/cookies" @click="closeModal">
          cookie policy
        </NuxtLink>
      </p>

      <Switch id="ga-toggle" v-model:model-value="cookiesAccepted.googleAnalytics" class="mb-8 mt-6">
        Analytical cookies
      </Switch>

      <div class="actions flex flex-wrap justify-center gap-4 sm:flex-nowrap">
        <POButton
          ref="acceptAll"
          class="w-full"
          btn-style="ev"
          color="green"
          tabindex="2"
          @click="acceptCookies"
        >
          Accept All
        </POButton>
        <POButton class="w-full" btn-style="ev" color="green" tabindex="3" @click="saveSetting">
          Save &amp; exit
        </POButton>
      </div>

      <div class="close absolute right-[10px] top-[10px] cursor-pointer" @click="closeModal">
        <svg
          width="26"
          height="27"
          viewBox="0 0 26 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="32.5712"
            height="4.42577"
            rx="1.13043"
            transform="matrix(0.696708 0.717355 -0.687085 0.726577 3.31641 -0.392578)"
            fill="#fff"
          />
          <rect
            width="32.5712"
            height="4.42577"
            rx="1.13043"
            transform="matrix(0.696708 0.717355 -0.687085 0.726577 3.31641 -0.392578)"
            fill="#fff"
            fill-opacity="0.2"
          />
          <rect
            width="32.5508"
            height="4.42854"
            rx="1.13043"
            transform="matrix(-0.691905 0.721988 -0.691905 -0.721988 25.9375 2.74609)"
            fill="#fff"
          />
          <rect
            width="32.5508"
            height="4.42854"
            rx="1.13043"
            transform="matrix(-0.691905 0.721988 -0.691905 -0.721988 25.9375 2.74609)"
            fill="#fff"
            fill-opacity="0.2"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const showModal = ref(false)
const consentGiven = ref(true)
const acceptAll = ref(null)

const autoFocusButtons = () => {
  if (acceptAll.value) {
    (acceptAll.value as HTMLInputElement).focus()
  }
}

interface Cookies {
  googleAnalytics: boolean;
}
const cookiesAccepted: Cookies = {
  googleAnalytics: true
}

const nuxtApp = useNuxtApp()

function checkCookiePreference () {
  const cookieAccepted = localStorage.getItem('cookiesAccepted')
  consentGiven.value = !!cookieAccepted
  if (cookieAccepted) { cookiesAccepted.googleAnalytics = (JSON.parse(cookieAccepted) as Cookies).googleAnalytics }
}
function loadGAIfAccepted () {
  if (consentGiven.value && cookiesAccepted.googleAnalytics) {
    nuxtApp.runWithContext(() =>
      useHead({
        script: [
          {
            async: true,
            src: 'https://www.googletagmanager.com/gtag/js?id=G-H93D07CWQT'
          },
          {
            children: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H93D07CWQT');
          `
          }
        ]
      })
    )
  }
}

function closeModal () {
  showModal.value = false
}
function openModal () {
  showModal.value = true
}

function saveSetting () {
  localStorage.setItem('cookiesAccepted', JSON.stringify(cookiesAccepted))
  consentGiven.value = true
  loadGAIfAccepted()
  closeModal()
}
function acceptCookies () {
  cookiesAccepted.googleAnalytics = true
  localStorage.setItem('cookiesAccepted', JSON.stringify(cookiesAccepted))
  consentGiven.value = true
  loadGAIfAccepted()
  closeModal()
}
function manageCookies () {
  openModal()
  autoFocusButtons()
}
onMounted(async () => {
  await nextTick()
  checkCookiePreference()
  loadGAIfAccepted()
})
</script>
<style lang="scss" scoped>
.max-wrapper {
  &.innerWrapper {
    @apply p-0 max-w-full;
  }
}
.cookie-message {
  p, a {
    @apply text-darkText;
    font-size: 1rem !important;
  }
  a {
    @apply underline;
  }
}
</style>
