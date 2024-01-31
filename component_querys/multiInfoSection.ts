import { blockContent } from './blockContent'
import { cta } from './cta'

export const multiInfoSection = `
_type == 'multiInfoSection' => {
  ...,
  defined(image) => {
    'image': image {
      'asset': asset->url + '?auto=format&w=1000',
      alt
    }
  },
  infoItems {
    ...,
    title[]{
      ${blockContent}
    },
    accordionsGroup {
      ...,
      accordions[]{
        ...,
        content[]{
          ${blockContent}
        },
        ${cta}
      }
    }
  }
}
`
