export function checkPath (link:string) {
  const route = useRoute()
  if (link === route.path) { return scrollToTop() }
}
