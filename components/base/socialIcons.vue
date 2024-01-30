<template>
  <div class="social sticky top-0 flex flex-row flex-wrap items-center justify-center gap-6 pt-4 lg:h-[460px] lg:w-[4.5rem] lg:flex-col lg:pt-28">
    <a class="linkedin" target="_blank" :href="getShareLink('linkedin', summary)">
      <div class="icon">
        <svg
          height="100%"
          style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
          version="1.1"
          viewBox="0 0 512 512"
          width="100%"
          xml:space="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:serif="http://www.serif.com/"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        ><g id="g5891"><g id="shapes"><rect
          id="rect11"
          height="257.962"
          width="85.76"
          x="61.053"
          y="178.667"
        /><path id="path13-0" d="M104.512,54.28c-29.341,0 -48.512,19.29 -48.512,44.573c0,24.752 18.588,44.574 47.377,44.574l0.554,0c29.903,0 48.516,-19.822 48.516,-44.574c-0.555,-25.283 -18.611,-44.573 -47.935,-44.573Z" style="fill-rule:nonzero;" /><path id="path15" d="M357.278,172.601c-45.49,0 -65.866,25.017 -77.276,42.589l0,-36.523l-85.738,0c1.137,24.197 0,257.961 0,257.961l85.737,0l0,-144.064c0,-7.711 0.554,-15.42 2.827,-20.931c6.188,-15.4 20.305,-31.352 43.993,-31.352c31.012,0 43.436,23.664 43.436,58.327l0,138.02l85.741,0l0,-147.93c0,-79.237 -42.305,-116.097 -98.72,-116.097Z" style="fill-rule:nonzero;" /></g></g></svg>
      </div>

    </a>
    <a class="twitter" target="_blank" :href="getShareLink('twitter', summary)">
      <div class="icon">
        <svg
          height="100%"
          style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
          version="1.1"
          viewBox="0 0 512 512"
          width="100%"
          xml:space="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:serif="http://www.serif.com/"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        ><rect height="400" style="fill:none;" width="400" x="56" y="56" /><path d="M161.014,464.013c193.208,0 298.885,-160.071 298.885,-298.885c0,-4.546 0,-9.072 -0.307,-13.578c20.558,-14.871 38.305,-33.282 52.408,-54.374c-19.171,8.495 -39.51,14.065 -60.334,16.527c21.924,-13.124 38.343,-33.782 46.182,-58.102c-20.619,12.235 -43.18,20.859 -66.703,25.498c-19.862,-21.121 -47.602,-33.112 -76.593,-33.112c-57.682,0 -105.145,47.464 -105.145,105.144c0,8.002 0.914,15.979 2.722,23.773c-84.418,-4.231 -163.18,-44.161 -216.494,-109.752c-27.724,47.726 -13.379,109.576 32.522,140.226c-16.715,-0.495 -33.071,-5.005 -47.677,-13.148l0,1.331c0.014,49.814 35.447,93.111 84.275,102.974c-15.464,4.217 -31.693,4.833 -47.431,1.802c13.727,42.685 53.311,72.108 98.14,72.95c-37.19,29.227 -83.157,45.103 -130.458,45.056c-8.358,-0.016 -16.708,-0.522 -25.006,-1.516c48.034,30.825 103.94,47.18 161.014,47.104" style="fill-rule:nonzero;" /></svg>
      </div>

    </a>
    <a class="facebook" target="_blank" :href="getShareLink('facebook', summary)">
      <div class="icon">
        <svg
          height="100%"
          style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
          version="1.1"
          viewBox="0 0 512 512"
          width="100%"
          xml:space="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:serif="http://www.serif.com/"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        ><path d="M374.245,285.825l14.104,-91.961l-88.233,0l0,-59.677c0,-25.159 12.325,-49.682 51.845,-49.682l40.117,0l0,-78.291c0,0 -36.408,-6.214 -71.214,-6.214c-72.67,0 -120.165,44.042 -120.165,123.775l0,70.089l-80.777,0l0,91.961l80.777,0l0,222.31c16.197,2.542 32.798,3.865 49.709,3.865c16.911,0 33.512,-1.323 49.708,-3.865l0,-222.31l74.129,0Z" style="fill-rule:nonzero;" /></svg>
      </div>
    </a>
  </div>
</template>
<script setup lang="ts">
interface Props {
  summary: string;
}
defineProps<Props>()

const router = useRouter()
function getShareLink (type: 'linkedin' | 'twitter' | 'facebook', text: string) {
  const types = {
    linkedin: 'https://www.linkedin.com/shareArticle',
    twitter: 'https://twitter.com/share',
    facebook: 'https://www.facebook.com/sharer.php'
  }
  const baseUrl = 'https://projectopal.co'
  const path = router.currentRoute.value.fullPath
  const fullUrl = baseUrl + path
  const encodedUrl = encodeURIComponent(fullUrl)
  const encodedText = encodeURIComponent(text)

  if (type === 'linkedin') { return `${types[type]}?title=${encodedText}&url=${encodedUrl}` }
  if (type === 'twitter') { return `${types[type]}?text=${encodedText}&url=${encodedUrl}` }
  if (type === 'facebook') { return `${types[type]}?u=${encodedUrl}` }
}
</script>
<style lang="scss" scoped>
.social.sticky:before {
  @apply lg:content-[''] bg-primary-400 w-[2px] h-full block absolute left-[50%] z-[-1] top-[-3.5rem];
}

.social {
  a {
    @apply inline-flex w-fit;
    .icon {
      @apply w-10 h-10 flex justify-center items-center bg-primary-400 rounded-[3px];
    }
  }
  svg {
    @apply w-6 h-6;
  }
  .linkedin {
    svg {
      path:not(#background), rect {
        @apply fill-background;
      }
      &:hover {
        path:not(#background), rect {
          @apply fill-secondary;
        }
      }
    }
  }
  .twitter, .facebook {
    svg {
      @apply fill-background;
      &:hover {
        @apply fill-secondary;
      }
    }
  }
}
</style>
