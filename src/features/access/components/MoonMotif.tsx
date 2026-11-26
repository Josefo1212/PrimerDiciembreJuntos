import type { ReactElement } from 'react'
import styles from './MoonMotif.module.css'

export type MoonPhase = 'crescent' | 'full'

type MoonMotifProps = {
  phase: MoonPhase
}

const MoonMotif = ({ phase }: MoonMotifProps): ReactElement => (
  <div className={`${styles.motif} ${styles[phase]}`} aria-hidden="true">
    <span className={styles.glow} />
    <span className={styles.orbit} />
    <span className={styles.moon}>
      <span className={styles.craters} />
    </span>
    <span className={`${styles.sparkle} ${styles.sparkleOne}`} />
    <span className={`${styles.sparkle} ${styles.sparkleTwo}`} />
  </div>
)

export default MoonMotif
