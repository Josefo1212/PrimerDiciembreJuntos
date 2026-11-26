import { useCallback, useEffect, useState, type ReactElement, type ReactNode } from 'react'
import { getVisitedDayIds, registerDayVisit } from '../../database/progress.ts'
import { ProgressContext } from '../../shared/progress/context.ts'
import type { ProgressContextValue, StorageStatus } from '../../shared/progress/types.ts'

type ProgressProviderProps = {
  children: ReactNode
}

const ProgressProvider = ({ children }: ProgressProviderProps): ReactElement => {
  const [visitedDayIds, setVisitedDayIds] = useState<Set<number>>(() => new Set<number>())
  const [storageStatus, setStorageStatus] = useState<StorageStatus>('loading')

  useEffect(() => {
    let active = true

    const loadProgress = async (): Promise<void> => {
      try {
        const storedDayIds = await getVisitedDayIds()

        if (active) {
          setVisitedDayIds((currentDayIds) => new Set([...storedDayIds, ...currentDayIds]))
          setStorageStatus('ready')
        }
      } catch {
        if (active) {
          setStorageStatus('unavailable')
        }
      }
    }

    void loadProgress()

    return () => {
      active = false
    }
  }, [])

  const markVisited = useCallback(async (dayId: number): Promise<void> => {
    setVisitedDayIds((currentDayIds) => new Set(currentDayIds).add(dayId))

    try {
      // Las visitas usan la fecha real: la fecha de prueba solo afecta al desbloqueo.
      await registerDayVisit(dayId, new Date())
    } catch {
      setStorageStatus('unavailable')
    }
  }, [])

  const value: ProgressContextValue = { visitedDayIds, storageStatus, markVisited }

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export default ProgressProvider
