export default defineNuxtPlugin(() => {
  async function urlForFile (source: string) {
    const fileQuery = groq`*[_id == "${source}"][0]{url}`
    const { data, error } = await useSanityQuery(fileQuery)
    return { data, error }
  }
  async function getFileUrl (source: string) {
    if (!source) { return }
    const { data } = await urlForFile(source)
    return data.value?.url
  }
  return {
    provide: { getFileUrl }
  }
})
