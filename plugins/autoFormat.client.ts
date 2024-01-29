export default defineNuxtPlugin(() => {
  function autoFormatClasses () {
    setTimeout(() => {
      if (!document) { return }
      document.querySelectorAll('.skewed-background').forEach((el) => {
        const previousSibling = el.previousSibling as Element
        previousSibling?.classList.add('pb-40')
      })
    }, 100)
  }
  return {
    provide: { autoFormatClasses }
  }
})
