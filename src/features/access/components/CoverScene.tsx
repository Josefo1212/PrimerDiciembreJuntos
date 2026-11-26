import type { ReactElement, ReactNode } from 'react'
import type { CoverMotifVariant } from './CoverMotif.tsx'
import CoverMotif from './CoverMotif.tsx'
import styles from './CoverScene.module.css'

type CoverSceneProps = {
  titleId: string
  eyebrow: string
  title: string
  titleAccent: string
  lead: string
  handwritten: string
  dayMark: string
  variant: CoverMotifVariant
  panelEyebrow: string
  panelTitle: string
  note?: string
  children: ReactNode
}

const STAR_COUNT = 14

const CoverScene = ({
  titleId,
  eyebrow,
  title,
  titleAccent,
  lead,
  handwritten,
  dayMark,
  variant,
  panelEyebrow,
  panelTitle,
  note,
  children,
}: CoverSceneProps): ReactElement => (
  <main className={styles.page}>
    <div className={styles.halo} aria-hidden="true" />
    <div className={styles.stars} aria-hidden="true">
      {Array.from({ length: STAR_COUNT }, (_, index) => (
        <span className={styles.star} key={index} />
      ))}
    </div>

    <section className={styles.cover} aria-labelledby={titleId}>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title} id={titleId}>
          {title}{' '}
          <em className={styles.titleAccent}>{titleAccent}</em>
        </h1>
        <p className={styles.lead}>{lead}</p>
        <p className={styles.handwritten}>{handwritten}</p>
        <span className={styles.dayMark} aria-hidden="true">
          {dayMark}
        </span>
      </div>

      <div className={styles.panel}>
        <div className={styles.motifWrap}>
          <CoverMotif variant={variant} />
        </div>
        <div className={styles.panelContent}>
          <p className={styles.panelEyebrow}>{panelEyebrow}</p>
          <h2 className={styles.panelTitle}>{panelTitle}</h2>
          {children}
          {note !== undefined && <p className={styles.panelNote}>{note}</p>}
        </div>
      </div>
    </section>
  </main>
)

export default CoverScene
