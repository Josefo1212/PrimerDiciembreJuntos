import { Link } from 'react-router'
import type { ReactElement } from 'react'
import styles from './NotFoundView.module.css'

const NotFoundView = (): ReactElement => (
  <main className={styles.page}>
    <section className={styles.card} aria-labelledby="not-found-title">
      <p className={styles.eyebrow}>Página no encontrada</p>
      <h1 className={styles.title} id="not-found-title">
        Esta página no existe
      </h1>
      <p className={styles.message}>Vuelve al inicio para entrar a tu calendario.</p>
      <Link className={styles.link} to="/">
        Volver al inicio
      </Link>
    </section>
  </main>
)

export default NotFoundView
