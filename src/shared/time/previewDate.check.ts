import {
  clearPreviewDate,
  formatPreviewDate,
  getPreviewDate,
  parsePreviewDate,
  setPreviewDate,
} from './previewDate.ts'

type RuleCase = {
  name: string
  actual: unknown
  expected: unknown
}

const formattedParse = (value: string): string | null => {
  const date = parsePreviewDate(value)

  return date === null ? null : formatPreviewDate(date)
}

const activePreviewDate = (): string | null => {
  const date = getPreviewDate()

  return date === null ? null : formatPreviewDate(date)
}

const applyPreviewDate = (value: string): boolean => {
  clearPreviewDate()

  return setPreviewDate(value)
}

const clearAndRead = (): string | null => {
  clearPreviewDate()

  return activePreviewDate()
}

const cases: RuleCase[] = [
  { name: 'fecha válida se conserva en formato local', actual: formattedParse('2026-12-05'), expected: '2026-12-05' },
  { name: 'mes de un dígito se rechaza', actual: formattedParse('2026-1-05'), expected: null },
  { name: 'día de un dígito se rechaza', actual: formattedParse('2026-12-5'), expected: null },
  { name: 'formato con barras se rechaza', actual: formattedParse('05/12/2026'), expected: null },
  { name: 'mes imposible se rechaza', actual: formattedParse('2026-13-01'), expected: null },
  { name: 'día imposible se rechaza', actual: formattedParse('2026-02-30'), expected: null },
  { name: '29 de febrero no bisiesto se rechaza', actual: formattedParse('2025-02-29'), expected: null },
  { name: '29 de febrero bisiesto se acepta', actual: formattedParse('2028-02-29'), expected: '2028-02-29' },
  { name: 'formato local rellena ceros', actual: formatPreviewDate(new Date(2026, 0, 9, 12)), expected: '2026-01-09' },
  { name: 'fecha válida se aplica', actual: applyPreviewDate('2026-12-05') && activePreviewDate(), expected: '2026-12-05' },
  { name: 'fecha inválida no se aplica', actual: applyPreviewDate('2026-02-30'), expected: false },
  { name: 'fecha se limpia', actual: clearAndRead(), expected: null },
]

const storageDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'sessionStorage')

const restoreStorage = (): void => {
  if (storageDescriptor === undefined) {
    Reflect.deleteProperty(globalThis, 'sessionStorage')

    return
  }

  Object.defineProperty(globalThis, 'sessionStorage', storageDescriptor)
}

const storageCases: RuleCase[] = (() => {
  try {
    if (storageDescriptor !== undefined) {
      Object.defineProperty(globalThis, 'sessionStorage', { value: undefined, configurable: true })
    }

    return [
      {
        name: 'sin sessionStorage aplica la fecha en memoria',
        actual: applyPreviewDate('2026-12-05') && activePreviewDate(),
        expected: '2026-12-05',
      },
      { name: 'sin sessionStorage rechaza fecha inválida', actual: applyPreviewDate('2026-02-30'), expected: false },
      { name: 'sin sessionStorage limpia la fecha', actual: clearAndRead(), expected: null },
    ]
  } finally {
    restoreStorage()
  }
})()

const allCases = [...cases, ...storageCases]
const failures = allCases.filter(({ actual, expected }) => actual !== expected)

if (failures.length > 0) {
  console.error(
    failures.map(({ name, actual, expected }) => `${name}: esperado ${expected}, obtenido ${actual}`),
  )
  throw new Error(`${failures.length} de ${allCases.length} casos de reglas fallaron`)
}

console.log(`${allCases.length}/${allCases.length} casos de reglas correctos`)
