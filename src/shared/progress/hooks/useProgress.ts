import { useContext } from 'react'
import { ProgressContext } from '../context.ts'
import type { ProgressContextValue } from '../types.ts'

export const useProgress = (): ProgressContextValue => {
  const context = useContext(ProgressContext)

  if (context === null) {
    throw new Error('useProgress debe usarse dentro de ProgressProvider')
  }

  return context
}
