import { blockContent } from './blockContent'

export const hero = `
_type == 'hero' => {
  ...,
  defined(heroImage) => {
    'heroImage': heroImage {
      'asset': asset->url,
      alt
    }
  },
  mainContent[] {
    ${blockContent}
  },
  ctas[] {
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
}`
