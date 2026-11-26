import type { DayProgressRecord } from '../shared/progress/types.ts'
import { db } from './db.ts'

export const getVisitedDayIds = async (): Promise<Set<number>> => {
  const records = await db.dayProgress.toArray()

  return new Set(records.map(({ dayId }) => dayId))
}

export const registerDayVisit = async (dayId: number, timestamp: Date): Promise<void> => {
  const lastVisit = timestamp.toISOString()

  await db.transaction('rw', db.dayProgress, async () => {
    const existing = await db.dayProgress.get(dayId)
    const record: DayProgressRecord = {
      dayId,
      firstVisit: existing?.firstVisit ?? lastVisit,
      lastVisit,
    }

    await db.dayProgress.put(record)
  })
}
