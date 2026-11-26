import type { ReactElement } from 'react'
import './WelcomeView.css'

const WelcomeView = (): ReactElement => (
  <main className="welcome">
    <section className="welcome__card" aria-labelledby="welcome-title">
      <p className="welcome__eyebrow">Ya estás dentro</p>
      <h1 className="welcome__title" id="welcome-title">
        Bienvenida, Isabela
      </h1>
      <p className="welcome__message">
        Tu diciembre empieza aquí. Pronto, cada día tendrá algo especialmente
        para ti.
      </p>
      <div className="welcome__accent" aria-hidden="true" />
    </section>
  </main>
)

export default WelcomeView
