import { blockContent } from './blockContent'

export const infoSection = `
_type == 'infoSection' => {
  ...,
  defined(image) => {
    'image': image {
      'asset': asset->url + '?auto=format&w=1000',
      alt
    }
  },
  content[]{
    ${blockContent}
  }
}
`
