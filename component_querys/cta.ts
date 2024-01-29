export const cta = `
defined(cta) => {
  'cta': cta {
    ...,
    defined(internal) => {
      'internal': select(
        internal->slug.current == '/' => internal->slug.current,
        internal->slug.current != '/' => '/'+internal->slug.current,
      ),
    },
    defined(file) => {
      'file': file.asset->url
    }
  }
}
`
