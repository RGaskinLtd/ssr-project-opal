import type { BlockContent } from './blockContent'
import type { Theme } from './theme'

export interface SplitContent {
  theme: Theme;
  invert: boolean;
  image: string;
  alt: string;
  content: BlockContent;
}
