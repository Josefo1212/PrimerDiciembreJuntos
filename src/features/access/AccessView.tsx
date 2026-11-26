import type { ReactElement } from 'react'
import AccessForm from './components/AccessForm'
import CoverScene from './components/CoverScene'

const AccessView = (): ReactElement => (
  <CoverScene
    titleId="access-title"
    eyebrow="Diciembre de 2026"
    title="Primer Diciembre"
    titleAccent="juntos"
    lead="Treinta y un días, una invitación y algo preparado solo para ti."
    handwritten="Para ti, Isabela"
    dayMark="31"
    phase="crescent"
    panelEyebrow="La noche te espera"
    panelTitle="Descubre tu diciembre"
  >
    <AccessForm />
  </CoverScene>
)

export default AccessView
