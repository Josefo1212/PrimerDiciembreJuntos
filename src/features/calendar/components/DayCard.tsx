import { Link } from 'react-router'
import type { ReactElement } from 'react'
import type { DayStatus } from '../types.ts'
import styles from './DayCard.module.css'

type DayCardProps = {
  dayId: number
  status: DayStatus
}

const STATUS_LABEL: Record<DayStatus, string> = {
  locked: 'Bloqueado',
  available: 'Disponible',
  visited: 'Visitado',
}

const DayCard = ({ dayId, status }: DayCardProps): ReactElement => {
  const label = STATUS_LABEL[status]
  const cardClass = `${styles.card} ${styles[status]}`

  if (status === 'locked') {
    return (
      <li className={cardClass}>
        <span className={styles.number}>{dayId}</span>
        <span className={styles.status}>{label}</span>
      </li>
    )
  }

  return (
    <li className={cardClass}>
      <Link
        className={styles.link}
        to={`/surprise/${dayId}`}
        aria-label={`Día ${dayId}, ${label.toLowerCase()}. Abrir sorpresa`}
      >
        <span className={styles.number}>{dayId}</span>
        <span className={styles.status}>
          {status === 'visited' && <span aria-hidden="true">✓ </span>}
          {label}
        </span>
      </Link>
    </li>
  )
}

export default DayCard
