import { createContext } from 'react'
import type { ProgressContextValue } from './types.ts'

export const ProgressContext = createContext<ProgressContextValue | null>(null)
