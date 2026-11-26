import { useCallback, useState, type ReactElement, type ReactNode } from 'react'
import { AccessContext } from '../../features/access/context'
import type { AccessContextValue, AccessState } from '../../features/access/types'

type AccessProviderProps = {
  children: ReactNode
}

const AccessProvider = ({ children }: AccessProviderProps): ReactElement => {
  const [accessState, setAccessState] = useState<AccessState>('locked')

  const unlock = useCallback((): void => setAccessState('unlocked'), [])

  const value: AccessContextValue = { accessState, unlock }

  return <AccessContext.Provider value={value}>{children}</AccessContext.Provider>
}

export default AccessProvider
