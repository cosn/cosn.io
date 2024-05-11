export function formatDate(dateString: string, relative?: boolean): string {
  const date = new Date(`${dateString}`)
  let formattedDate = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })

  if (!relative) return formattedDate

  const diff = new Date().getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days < 1) {
    return 'Earlier today'
  } else if (days < 2) {
    return 'Yesterday'
  } else if (days < 7) {
    return `${days} days ago`
  } else if (days > 7 && days < 30) {
    return `${Math.floor(days / 7)} weeks ago`
  } else if (days >= 30 && days < 60) {
    return `A month ago`
  } else {
    return formattedDate
  }
}
