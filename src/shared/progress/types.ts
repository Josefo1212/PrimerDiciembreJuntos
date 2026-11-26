export type DayProgressRecord = {
  dayId: number
  firstVisit: string
  lastVisit: string
}

export type StorageStatus = 'loading' | 'ready' | 'unavailable'

export type ProgressContextValue = {
  visitedDayIds: ReadonlySet<number>
  storageStatus: StorageStatus
  markVisited: (dayId: number) => Promise<void>
}
