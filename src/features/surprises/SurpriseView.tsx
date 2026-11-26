import { Link, Navigate, useParams } from 'react-router'
import { useEffect, useRef, type ReactElement } from 'react'
import NotFoundView from '../access/components/NotFoundView.tsx'
import { useProgress } from '../../shared/progress/hooks/useProgress.ts'
import { getUnlockDate } from '../../shared/time/unlockDate.ts'
import { isDayUnlocked, parseDayId } from '../calendar/rules/dateRules.ts'
import styles from './SurpriseView.module.css'

const SurpriseView = (): ReactElement => {
  const { dayId } = useParams()
  const { markVisited } = useProgress()
  const registeredDay = useRef<number | null>(null)
  const parsedDayId = parseDayId(dayId)
  const unlocked = parsedDayId !== null && isDayUnlocked(parsedDayId, getUnlockDate())

  useEffect(() => {
    if (parsedDayId === null || !unlocked || registeredDay.current === parsedDayId) {
      return
    }

    registeredDay.current = parsedDayId

    void markVisited(parsedDayId)
  }, [parsedDayId, unlocked, markVisited])

  if (parsedDayId === null) {
    return <NotFoundView />
  }

  if (!unlocked) {
    return <Navigate to="/calendar" replace />
  }

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="surprise-title">
        <p className={styles.eyebrow}>Día {parsedDayId} de diciembre</p>
        <h1 className={styles.title} id="surprise-title">
          Sorpresa del día {parsedDayId}
        </h1>
        <p className={styles.message}>
          Este día ya está abierto para ti. Su sorpresa definitiva llegará pronto.
        </p>
        <Link className={styles.backLink} to="/calendar">
          Volver al calendario
        </Link>
      </section>
    </main>
  )
}

export default SurpriseView
