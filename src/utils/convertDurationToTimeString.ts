export function convertDurationToTimeString(duration: number) {
  // convert seconds to hours
  const hours = Math.floor(duration / 3600) // hour / (60 * 60)

  // convert minutes to hours
  const minutes = Math.floor((duration % 3600) / 60)

  // convert seconds to hours
  const seconds = duration % 60

  const timeString = [hours, minutes, seconds]
    .map((unit) => String(unit).padStart(2, '0'))
    .join(':')

  return timeString
}
