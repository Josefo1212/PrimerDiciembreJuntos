import { Link } from 'react-router'
import type { ReactElement } from 'react'
import styles from './WelcomeView.module.css'

const WelcomeView = (): ReactElement => (
  <main className={styles.page}>
    <section className={styles.card} aria-labelledby="welcome-title">
      <p className={styles.eyebrow}>Ya estás dentro</p>
      <h1 className={styles.title} id="welcome-title">
        Bienvenida, Isabela
      </h1>
      <p className={styles.message}>
        Tu diciembre empieza aquí. Pronto, cada día tendrá algo especialmente para ti.
      </p>
      <Link className={styles.calendarLink} to="/calendar">
        Abrir mi calendario
      </Link>
      <div className={styles.accent} aria-hidden="true" />
    </section>
  </main>
)

export default WelcomeView
