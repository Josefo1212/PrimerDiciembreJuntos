import { getDayStatus, isDayUnlocked, isValidDayId, parseDayId } from './dateRules.ts'

type RuleCase = {
  name: string
  actual: unknown
  expected: unknown
}

const cases: RuleCase[] = [
  { name: 'día 1 es válido', actual: isValidDayId(1), expected: true },
  { name: 'día 31 es válido', actual: isValidDayId(31), expected: true },
  { name: 'día 0 no es válido', actual: isValidDayId(0), expected: false },
  { name: 'día 32 no es válido', actual: isValidDayId(32), expected: false },
  { name: 'decimal no es válido', actual: isValidDayId(1.5), expected: false },
  { name: 'texto no es válido', actual: isValidDayId('1'), expected: false },
  { name: 'parámetro "1" se convierte en 1', actual: parseDayId('1'), expected: 1 },
  { name: 'parámetro "32" se rechaza', actual: parseDayId('32'), expected: null },
  { name: 'parámetro "abc" se rechaza', actual: parseDayId('abc'), expected: null },
  { name: 'parámetro ausente se rechaza', actual: parseDayId(undefined), expected: null },
  {
    name: '30/11/2026 bloquea el día 1',
    actual: isDayUnlocked(1, new Date(2026, 10, 30, 23, 59)),
    expected: false,
  },
  {
    name: '1/12/2026 desbloquea el día 1',
    actual: isDayUnlocked(1, new Date(2026, 11, 1, 0, 0)),
    expected: true,
  },
  {
    name: '1/12/2026 bloquea el día 2',
    actual: isDayUnlocked(2, new Date(2026, 11, 1)),
    expected: false,
  },
  {
    name: '5/12/2026 desbloquea el día 5',
    actual: isDayUnlocked(5, new Date(2026, 11, 5)),
    expected: true,
  },
  {
    name: '5/12/2026 bloquea el día 6',
    actual: isDayUnlocked(6, new Date(2026, 11, 5)),
    expected: false,
  },
  {
    name: '31/12/2026 desbloquea el día 31',
    actual: isDayUnlocked(31, new Date(2026, 11, 31)),
    expected: true,
  },
  {
    name: '1/1/2027 desbloquea el día 1',
    actual: isDayUnlocked(1, new Date(2027, 0, 1)),
    expected: true,
  },
  {
    name: '31/12/2025 bloquea el día 31',
    actual: isDayUnlocked(31, new Date(2025, 11, 31)),
    expected: false,
  },
  {
    name: 'día desbloqueado sin visita está disponible',
    actual: getDayStatus(1, new Date(2026, 11, 1), new Set<number>()),
    expected: 'available',
  },
  {
    name: 'día desbloqueado con visita está visitado',
    actual: getDayStatus(1, new Date(2026, 11, 1), new Set([1])),
    expected: 'visited',
  },
  {
    name: 'día futuro con visita sigue bloqueado',
    actual: getDayStatus(2, new Date(2026, 11, 1), new Set([2])),
    expected: 'locked',
  },
  {
    name: 'día del año siguiente con visita está visitado',
    actual: getDayStatus(31, new Date(2027, 0, 1), new Set([31])),
    expected: 'visited',
  },
]

const failures = cases.filter(({ actual, expected }) => actual !== expected)

if (failures.length > 0) {
  console.error(
    failures.map(({ name, actual, expected }) => `${name}: esperado ${expected}, obtenido ${actual}`),
  )
  throw new Error(`${failures.length} de ${cases.length} casos de reglas fallaron`)
}

console.log(`${cases.length}/${cases.length} casos de reglas correctos`)
