import type { ReactElement } from 'react'
import AccessView from './AccessView'
import WelcomeView from './WelcomeView'
import { useAccess } from './hooks/useAccess'

const AccessRoute = (): ReactElement => {
  const { accessState } = useAccess()

  return accessState === 'unlocked' ? <WelcomeView /> : <AccessView />
}

export default AccessRoute
