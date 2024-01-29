import type { PortableTextBlock, PortableTextMarkDefinition, ArbitraryTypedObject, PortableTextSpan } from '@portabletext/types'

export interface NewsArticle {
  oldPublishedDate: string;
  published: string;
  title: string;
  summary: PortableTextBlock<PortableTextMarkDefinition, ArbitraryTypedObject | PortableTextSpan, string, string>[];
  tag: string;
  image: string;
  link: string;
}
