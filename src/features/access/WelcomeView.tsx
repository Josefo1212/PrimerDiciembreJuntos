import { Link } from 'react-router'
import type { ReactElement } from 'react'
import CoverScene from './components/CoverScene'
import styles from './WelcomeView.module.css'

const WelcomeView = (): ReactElement => (
  <CoverScene
    titleId="welcome-title"
    eyebrow="Ya estás dentro"
    title="Bienvenida,"
    titleAccent="Isabela"
    lead="Tu diciembre empieza aquí. Pronto, cada día tendrá algo especialmente para ti."
    handwritten="Esta noche es tuya."
    dayMark="01"
    phase="full"
    panelEyebrow="La luna está contigo"
    panelTitle="Empieza la cuenta atrás"
    note="Treinta y una sorpresas te están esperando."
  >
    <Link className={styles.calendarLink} to="/calendar">
      Abrir mi calendario
    </Link>
  </CoverScene>
)

export default WelcomeView
