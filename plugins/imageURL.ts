import imageUrlBuilder from '@sanity/image-url'
import { SanityClientLike } from '@sanity/image-url/lib/types/types'

export default defineNuxtPlugin(() => {
  const clientConfig = useSanity().config as unknown as SanityClientLike
  const builder = imageUrlBuilder(clientConfig)
  function urlFor (source: string) {
    if (!source) { return }
    return builder.image(source).auto('format')
  }
  function getImage (imageRef: string) {
    if (!imageRef) { return }
    const image = urlFor(imageRef)
    if (!image) { return }
    return image.url()
  }
  return {
    provide: { urlFor, getImage }
  }
})
