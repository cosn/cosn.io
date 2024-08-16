export const formatDate = (dateString: string, relative = false): string => {
  const date = new Date(`${dateString}`)
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })

  if (!relative) return formattedDate

  const diff = new Date().getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days < 1) {
    return `Earlier today`
  } else if (days < 2) {
    return `Yesterday`
  } else if (days < 7) {
    return `${days} days ago`
  } else if (days < 15) {
    return `${Math.round(days / 7)} weeks ago`
  } else if (days < 31) {
    return `Past month`
  } else if (days < 45) {
    return `Last month`
  } else {
    return formattedDate
  }
}
