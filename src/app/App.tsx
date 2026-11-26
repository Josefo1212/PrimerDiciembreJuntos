import { useState, type ReactElement } from 'react'
import AccessView from '../features/access/AccessView'
import WelcomeView from '../features/access/WelcomeView'
import type { AccessState } from '../features/access/types'

const App = (): ReactElement => {
  const [accessState, setAccessState] = useState<AccessState>('locked')

  const handleSuccess = (): void => setAccessState('unlocked')

  if (accessState === 'unlocked') {
    return <WelcomeView />
  }

  return <AccessView onSuccess={handleSuccess} />
}

export default App
