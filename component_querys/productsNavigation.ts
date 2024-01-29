export const productsNavigation = `
defined(productsNavigation) => {
  'productsNavigation': productsNavigation {
    ...@->content[0].navigateProducts {
      ...,
      'bgImage': bgImage.asset->url,
      products[] {

        ...,
        'link': select(
          link->slug.current == '/' => link->slug.current,
          link->slug.current != '/' => '/'+link->slug.current,
        )
      }
    }
  }
}`
