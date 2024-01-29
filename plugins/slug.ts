export default defineNuxtPlugin(() => {
  async function getSlug (source: string) {
    const fileQuery = groq`*[_id == "${source}"][0]{slug}`
    const { data, error } = await useSanityQuery(fileQuery)
    return { data, error }
  }
  async function getSlugFromRef (source: string) {
    if (!source) { return }
    const { data, error } = await getSlug(source)
    if (data) { return data.value?.slug?.current }
    if (error) { return error }
    return 'internal link not found'
  }
  return {
    provide: { getSlugFromRef }
  }
})
