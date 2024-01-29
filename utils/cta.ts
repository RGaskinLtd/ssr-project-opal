export interface CTA {
  internal?: string;
  external?: string;
  file?: string;
  text?: string;
  style?: 'arrow' | 'po';
  color?: 'opal' | 'solid-opal' | 'green';
  linkType: 'internal' | 'external' | 'file';
  target?: string;
}
