import { blockContent } from './blockContent'
import { cta } from './cta'

export const accordions = `
_type == 'accordions' => {
  ...,
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
`
