import type { ReactElement } from 'react'
import type { DayStatus } from '../types.ts'
import DayCard from './DayCard.tsx'
import styles from './CalendarGrid.module.css'

export type CalendarDay = {
  dayId: number
  status: DayStatus
}

type CalendarGridProps = {
  days: ReadonlyArray<CalendarDay>
}

const CalendarGrid = ({ days }: CalendarGridProps): ReactElement => (
  <ol className={styles.grid}>
    {days.map(({ dayId, status }) => (
      <DayCard key={dayId} dayId={dayId} status={status} />
    ))}
  </ol>
)

export default CalendarGrid
