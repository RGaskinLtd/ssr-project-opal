<template>
  <div
    v-if="products?.length"
    class="bg-full lg:ml-1/12 grid w-full bg-no-repeat lg:w-5/12"
    :style="{'background-image': `url(${bgImage})`}"
  >
    <span
      v-if="showTitle"
      class="sm:pl-2/12 pb-6 pl-0 text-left !text-sm font-bold uppercase"
    >NAVIGATE TO MORE PRODUCTS</span>
    <div class="flex flex-nowrap items-center justify-center gap-4 md:justify-end">
      <div
        v-for="(product, index) in products"
        :key="index"
      >
        <NuxtLink :to="product.link">
          <img
            class="w-[100px]"
            width="100px"
            height="137px"
            :src="$urlFor(product?.image?.asset?._ref ?? '')?.width(100).height(137).dpr(2).url()"
            :alt="`${product.name} product`"
          >
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  showTitle?: boolean;
  bgImage?: string | null;
  products?:[{
    name: string;
    link: string;
    image: {
      asset: { _ref: string; }
    };
  }] | null
}

const props = withDefaults(
  defineProps<Props>(), {
    showTitle: true,
    bgImage: null,
    products: null
  }
)

const products = computed(() => props?.products ?? [])
</script>
