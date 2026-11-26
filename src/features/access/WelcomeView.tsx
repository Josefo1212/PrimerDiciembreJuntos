import { Link } from 'react-router'
import type { ReactElement } from 'react'
import CoverMotif from './components/CoverMotif'
import styles from './WelcomeView.module.css'

const WelcomeView = (): ReactElement => (
  <main className={styles.page}>
    <section className={styles.cover} aria-labelledby="welcome-title">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>Ya estás dentro</p>
        <h1 className={styles.title} id="welcome-title">
          Bienvenida,
          <em className={styles.titleAccent}>Isabela</em>
        </h1>
        <p className={styles.lead}>
          Tu diciembre empieza aquí. Pronto, cada día tendrá algo especialmente para ti.
        </p>
        <p className={styles.handwritten}>Este sobre ya es tuyo.</p>
        <span className={styles.dayMark} aria-hidden="true">
          01
        </span>
      </div>

      <div className={styles.panel}>
        <div className={styles.motifWrap}>
          <CoverMotif variant="open" />
        </div>
        <div className={styles.panelContent}>
          <p className={styles.panelEyebrow}>Sobre abierto</p>
          <h2 className={styles.panelTitle}>Empieza la cuenta atrás</h2>
          <Link className={styles.calendarLink} to="/calendar">
            Abrir mi calendario
          </Link>
          <p className={styles.panelNote}>Treinta y una sorpresas te están esperando.</p>
        </div>
      </div>
    </section>
  </main>
)

export default WelcomeView
