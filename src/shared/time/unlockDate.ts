import { getPreviewDate } from './previewDate.ts'

export const getUnlockDate = (): Date => {
  if (!import.meta.env.DEV) {
    return new Date()
  }

  return getPreviewDate() ?? new Date()
}
