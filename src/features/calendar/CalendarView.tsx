import { Link } from 'react-router'
import type { ReactElement } from 'react'
import { useProgress } from '../../shared/progress/hooks/useProgress.ts'
import CalendarGrid, { type CalendarDay } from './components/CalendarGrid.tsx'
import { getDayStatus } from './rules/dateRules.ts'
import { TOTAL_DAYS } from './types.ts'
import styles from './CalendarView.module.css'

const CalendarView = (): ReactElement => {
  const { visitedDayIds, storageStatus } = useProgress()
  const now = new Date()

  const days: CalendarDay[] = Array.from({ length: TOTAL_DAYS }, (_, index) => {
    const dayId = index + 1

    return { dayId, status: getDayStatus(dayId, now, visitedDayIds) }
  })

  return (
    <main className={styles.page}>
      <section className={styles.content} aria-labelledby="calendar-title">
        <header className={styles.header}>
          <p className={styles.eyebrow}>Diciembre de 2026</p>
          <h1 className={styles.title} id="calendar-title">
            Tu calendario
          </h1>
          <p className={styles.progress} aria-live="polite">
            {visitedDayIds.size} de {TOTAL_DAYS} días visitados
          </p>
        </header>

        {storageStatus === 'unavailable' && (
          <p className={styles.storageWarning} role="status">
            No pudimos guardar tu progreso en este navegador. Lo que abras hoy solo durará hasta que
            cierres la página.
          </p>
        )}

        <CalendarGrid days={days} />

        <Link className={styles.backLink} to="/">
          Volver al inicio
        </Link>
      </section>
    </main>
  )
}

export default CalendarView
