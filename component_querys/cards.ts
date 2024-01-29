import { blockContent } from './blockContent'
import { cta } from './cta'

export const cards = `
_type == 'cards' => {
  ...,
  defined(cardsSummary) => {
    cardsSummary[]{
      ...,
      content[]{
        ${blockContent}
      },
      defined(icon) => {
        'icon': icon.asset->url,
      }
    },
  },

  defined(cardsShortArticle) => {
    cardsShortArticle[] {
      ...,
      content[]{
        ${blockContent}
      },
      ${cta}
    }
  }
}`
