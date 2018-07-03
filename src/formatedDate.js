const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

const hour = hour => {
  if (hour === 0 || hour === 12) return 12
  return String(hour % 12).padStart(2, '0')
}

const suffix = hour => {
  if (hour === 0) return 'am'
  if (hour === 12) return 'pm'
  return hour < 12 ? "am" : "pm"
}

export const formatedDate = date => {
  const d = new Date(date)
  const jj = d.getDate()
  const mm = d.getMonth()
  const yyyy = d.getFullYear()
  const hh = d.getHours()
  const min = d.getMinutes()

  return `${hour(hh)}:${min} ${suffix(hh)} - ${monthNames[mm]} ${jj}, ${yyyy}`
}
