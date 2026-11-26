import type { ReactElement } from 'react'
import AccessForm from './components/AccessForm'
import CoverMotif from './components/CoverMotif'
import styles from './AccessView.module.css'

const AccessView = (): ReactElement => (
  <main className={styles.page}>
    <section className={styles.cover} aria-labelledby="access-title">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>Diciembre de 2026</p>
        <h1 className={styles.title} id="access-title">
          Primer Diciembre{' '}
          <em className={styles.titleAccent}>juntos</em>
        </h1>
        <p className={styles.lead}>
          Treinta y un días, una invitación y algo preparado solo para ti.
        </p>
        <p className={styles.handwritten}>Para ti, Isabela</p>
        <span className={styles.dayMark} aria-hidden="true">
          31
        </span>
      </div>

      <div className={styles.panel}>
        <div className={styles.motifWrap}>
          <CoverMotif variant="closed" />
        </div>
        <div className={styles.panelContent}>
          <p className={styles.panelEyebrow}>Tu sobre está cerrado</p>
          <h2 className={styles.panelTitle}>Ábrelo con el código</h2>
          <AccessForm />
        </div>
      </div>
    </section>
  </main>
)

export default AccessView
