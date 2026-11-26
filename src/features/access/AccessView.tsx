import type { ReactElement } from 'react'
import AccessForm from './components/AccessForm'
import './AccessView.css'

type AccessViewProps = {
  onSuccess: () => void
}

const AccessView = ({ onSuccess }: AccessViewProps): ReactElement => (
  <main className="access">
    <section className="access__card" aria-labelledby="access-title">
      <p className="access__eyebrow">Diciembre de 2026</p>
      <h1 className="access__title" id="access-title">
        Primer Diciembre juntos
      </h1>
      <p className="access__description">
        Antes de abrir tus días, escribe el código que te espera.
      </p>
      <AccessForm onSuccess={onSuccess} />
    </section>
  </main>
)

export default AccessView
