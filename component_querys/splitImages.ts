import { blockContent } from './blockContent'
import { cta } from './cta'

export const splitImages = `
_type == 'splitImages' => {
  ...,
  images[] {
    'asset': asset->url + '?auto=format&w=960&h=540',
    'alt': alt,
    content[] {
      ${blockContent}
    },
    ${cta}
  }
}
`
