import Dexie, { type Table } from 'dexie'
import type { DayProgressRecord } from '../shared/progress/types.ts'

class ProgressDatabase extends Dexie {
  dayProgress!: Table<DayProgressRecord, number>

  constructor() {
    super('primerDiciembreJuntos')
    this.version(1).stores({
      dayProgress: 'dayId',
    })
  }
}

export const db = new ProgressDatabase()
