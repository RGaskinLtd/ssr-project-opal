import type { PortableTextBlock, PortableTextMarkDefinition, ArbitraryTypedObject, PortableTextSpan } from '@portabletext/types'

export interface CountryData {
  name: string;
  description: PortableTextBlock<PortableTextMarkDefinition, ArbitraryTypedObject | PortableTextSpan, string, string>[];
  address: PortableTextBlock<PortableTextMarkDefinition, ArbitraryTypedObject | PortableTextSpan, string, string>[];
  partOfGCC: boolean;
  companyDetails?: {
    title?: string;
    website?: string;
    email?: string;
    logo?: string;
  }
}
