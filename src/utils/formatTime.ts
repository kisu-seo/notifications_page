/* === Time Formatting Util / 시간 포맷 유틸 === */
import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
} from 'date-fns'

// --- 상대 시간 단축 포맷 (예: "1m ago", "2 weeks ago") ---
export function formatTime(date: Date): string {
  const now = new Date()

  const minutes = differenceInMinutes(now, date)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`

  const hours = differenceInHours(now, date)
  if (hours < 24) return `${hours}h ago`

  const days = differenceInDays(now, date)
  if (days < 7) return days === 1 ? '1 day ago' : `${days} days ago`

  const weeks = differenceInWeeks(now, date)
  if (weeks < 5) return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`

  const months = differenceInMonths(now, date)
  if (months < 12) return months === 1 ? '1 month ago' : `${months} months ago`

  const years = Math.floor(months / 12)
  return years === 1 ? '1 year ago' : `${years} years ago`
}
