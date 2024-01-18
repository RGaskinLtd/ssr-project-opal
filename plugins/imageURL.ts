import imageUrlBuilder from '@sanity/image-url'
import { SanityClientLike } from '@sanity/image-url/lib/types/types'

export default defineNuxtPlugin(() => {
  const clientConfig = useSanity().config as unknown as SanityClientLike
  const builder = imageUrlBuilder(clientConfig)
  function urlFor (source: string) {
    return builder.image(source).auto('format')
  }
  return {
    provide: { urlFor }
  }
})
