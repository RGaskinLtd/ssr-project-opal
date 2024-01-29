import type { BlockContent } from '~/types'

export interface Accordion {
  title?: string;
  summary: string;
  content: BlockContent;
  cta?: CTA;
}
export type Accordions = Accordion[]
