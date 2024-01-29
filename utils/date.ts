export function formatDate (dateString: string) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const date = new Date(dateString)
  const day = date.getUTCDate()
  const month = months[date.getUTCMonth()].slice(0, 3)
  const year = date.getUTCFullYear()

  return `${day} ${month} ${year}`
}
