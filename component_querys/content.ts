import { blockContent } from './blockContent'

export const content = `
_type == 'content' => {
  ...,
  mainContent[]{
    ${blockContent}
  }
}`
