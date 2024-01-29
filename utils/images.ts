const { $urlFor } = useNuxtApp()
export function getImage (imageRef: string) {
  if (!imageRef) { return }
  const image = $urlFor(imageRef)
  if (!image) { return }
  return image.url()
}
