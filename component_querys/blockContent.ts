export const blockContent = `
...,
markDefs[]{
  ...,
  _type == "internalLink" => {
    "slug": select(
      @.reference->slug.current == '/' => @.reference->slug.current,
      @.reference->slug.current != '/' => '/'+@.reference->slug.current,
    ),
  }
},`
