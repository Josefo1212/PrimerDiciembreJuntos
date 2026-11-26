import type { ReactElement } from 'react'
import styles from './CoverMotif.module.css'

export type CoverMotifVariant = 'closed' | 'open'

type CoverMotifProps = {
  variant: CoverMotifVariant
}

const CoverMotif = ({ variant }: CoverMotifProps): ReactElement => (
  <div className={`${styles.motif} ${styles[variant]}`} aria-hidden="true">
    <span className={styles.halo} />
    <span className={`${styles.sparkle} ${styles.sparkleTop}`} />
    <span className={`${styles.sparkle} ${styles.sparkleBottom}`} />
    <span className={styles.shadow} />
    <span className={styles.flap} />
    <span className={styles.letter}>
      <span className={styles.letterLines} />
      <span className={styles.letterDate}>01 · 12</span>
    </span>
    <span className={styles.body}>
      <span className={styles.foldLeft} />
      <span className={styles.foldRight} />
      <span className={styles.seal} />
    </span>
  </div>
)

export default CoverMotif
