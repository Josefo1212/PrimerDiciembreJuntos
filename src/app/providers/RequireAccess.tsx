import { Navigate } from 'react-router'
import type { ReactElement, ReactNode } from 'react'
import { useAccess } from '../../features/access/hooks/useAccess.ts'

type RequireAccessProps = {
  children: ReactNode
}

const RequireAccess = ({ children }: RequireAccessProps): ReactElement => {
  const { accessState } = useAccess()

  return accessState === 'unlocked' ? <>{children}</> : <Navigate to="/" replace />
}

export default RequireAccess
