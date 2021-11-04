const addZero = (time): string => {
  return `${time < 10 ? '0' : ''}${time}`
}

export const formatTime = (timestamp: string): string => {
  const currentDate = new Date()
  const yesterday = new Date()
  yesterday.setDate(currentDate.getDate() - 1)
  const date = new Date(timestamp)

  if (date === yesterday) {
    return 'yesterday'
  }

  if (date < yesterday) {
    const month = addZero(date.getMonth() + 1)
    const day = addZero(date.getDate())
    const year = date.getFullYear()
    return `${month}/${day}/${year}`
  }

  const time = `${addZero(date.getHours())}:${addZero(
    date.getMinutes()
  )}`
  return time
}
