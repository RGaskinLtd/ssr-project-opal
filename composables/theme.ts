import type { Theme } from '~/types'

export function themeStyles (theme: Theme) {
  if (theme === 'light') { return 'bg-white text-black' }
  if (theme === 'dark') { return 'bg-background text-main' }
}
