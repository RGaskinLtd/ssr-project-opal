import { blockContent } from './blockContent'

export const splitContent = `
_type == 'splitContent' => {
  ...,
  'image': image.asset->url + '?w=1000',
  'alt': image.alt,
  content[]{
    ${blockContent}
  }
}
`
