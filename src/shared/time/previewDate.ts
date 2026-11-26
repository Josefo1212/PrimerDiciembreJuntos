export const PREVIEW_DATE_STORAGE_KEY = 'previewDate'

const PREVIEW_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/
const pad = (value: number): string => String(value).padStart(2, '0')

let memoryPreviewDate: Date | null = null

export const parsePreviewDate = (value: string): Date | null => {
  const match = PREVIEW_DATE_PATTERN.exec(value)

  if (match === null) {
    return null
  }

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const date = new Date(year, month - 1, day, 12)

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null
  }

  return date
}

export const formatPreviewDate = (date: Date): string =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

const readStoredValue = (): string | null => {
  try {
    return globalThis.sessionStorage?.getItem(PREVIEW_DATE_STORAGE_KEY) ?? null
  } catch {
    return null
  }
}

export const getPreviewDate = (): Date | null => {
  const storedValue = readStoredValue()

  if (storedValue !== null) {
    return parsePreviewDate(storedValue)
  }

  return memoryPreviewDate
}

export const setPreviewDate = (value: string): boolean => {
  const parsedDate = parsePreviewDate(value)

  if (parsedDate === null) {
    return false
  }

  memoryPreviewDate = parsedDate

  try {
    globalThis.sessionStorage?.setItem(PREVIEW_DATE_STORAGE_KEY, formatPreviewDate(parsedDate))
  } catch {
    // La herramienta sigue funcionando en memoria si el almacenamiento falla.
  }

  return true
}

export const clearPreviewDate = (): void => {
  memoryPreviewDate = null

  try {
    globalThis.sessionStorage?.removeItem(PREVIEW_DATE_STORAGE_KEY)
  } catch {
    // No hay nada que limpiar si el almacenamiento no está disponible.
  }
}
