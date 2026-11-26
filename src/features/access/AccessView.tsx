import type { ReactElement } from 'react'
import AccessForm from './components/AccessForm'
import styles from './AccessView.module.css'

type AccessViewProps = {
  onSuccess: () => void
}

const AccessView = ({ onSuccess }: AccessViewProps): ReactElement => (
  <main className={styles.page}>
    <section className={styles.card} aria-labelledby="access-title">
      <p className={styles.eyebrow}>Diciembre de 2026</p>
      <h1 className={styles.title} id="access-title">
        Primer Diciembre juntos
      </h1>
      <p className={styles.description}>
        Antes de abrir tus días, escribe el código que te espera.
      </p>
      <AccessForm onSuccess={onSuccess} />
    </section>
  </main>
)

export default AccessView
