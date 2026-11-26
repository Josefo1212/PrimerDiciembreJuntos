import { DECEMBER_MONTH, FIRST_DAY, LAST_DAY, TARGET_YEAR, type DayStatus } from '../types.ts'

const TARGET_MONTH_KEY = TARGET_YEAR * 100 + DECEMBER_MONTH

const getLocalMonthKey = (date: Date): number => date.getFullYear() * 100 + date.getMonth() + 1

export const isValidDayId = (value: unknown): value is number =>
  typeof value === 'number' && Number.isInteger(value) && value >= FIRST_DAY && value <= LAST_DAY

export const parseDayId = (raw: string | undefined): number | null => {
  if (raw === undefined || !/^\d+$/.test(raw)) {
    return null
  }

  const dayId = Number(raw)

  return isValidDayId(dayId) ? dayId : null
}

export const isDayUnlocked = (dayId: number, now: Date): boolean => {
  const currentMonthKey = getLocalMonthKey(now)

  if (currentMonthKey > TARGET_MONTH_KEY) {
    return true
  }

  if (currentMonthKey < TARGET_MONTH_KEY) {
    return false
  }

  return now.getDate() >= dayId
}

export const getDayStatus = (
  dayId: number,
  now: Date,
  visitedDayIds: ReadonlySet<number>,
): DayStatus => {
  if (!isDayUnlocked(dayId, now)) {
    return 'locked'
  }

  return visitedDayIds.has(dayId) ? 'visited' : 'available'
}
