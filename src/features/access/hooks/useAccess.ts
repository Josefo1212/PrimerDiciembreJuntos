import { useContext } from 'react'
import { AccessContext } from '../context'
import type { AccessContextValue } from '../types'

export const useAccess = (): AccessContextValue => {
  const context = useContext(AccessContext)

  if (context === null) {
    throw new Error('useAccess debe usarse dentro de AccessProvider')
  }

  return context
}
