import { blockContent } from './blockContent'

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
      title[]{
        ${blockContent}
      },
      ...,
    }
  }
}
`
