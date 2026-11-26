export const TEMP_ACCESS_CODE = '2026'

export const normalizeCode = (value: string): string => value.trim()

export const getAccessError = (value: string): string | null => {
  const code = normalizeCode(value)

  if (code.length === 0) {
    return 'Introduce el código'
  }

  if (!/^\d+$/.test(code)) {
    return 'Solo números'
  }

  if (code !== TEMP_ACCESS_CODE) {
    return 'Ese código no es correcto'
  }

  return null
}

export const isCodeValid = (value: string): boolean => getAccessError(value) === null
