import { DateTime } from "luxon"

export const calculateStreak = (trackingData) => {
  if (!Array.isArray(trackingData) || trackingData.length === 0) {
    return 0
  }

  const completedDates = Array.from(
    new Set(
      trackingData
        .filter(item => item.status === true)
        .map(item => item.date)
    )
  )
    .map(d => DateTime.fromISO(d))
    .sort((a, b) => b.toMillis() - a.toMillis())

  if (completedDates.length === 0) return 0

  const today = DateTime.local().startOf("day")
  const latestCompleted = completedDates[0]


  if (today.diff(latestCompleted, "days").days > 1) {
    return 0
  }

  let streak = 0
  let current = latestCompleted

  while (completedDates.some(d => d.hasSame(current, "day"))) {
    streak++
    current = current.minus({ days: 1 })
  }

  return streak
}
