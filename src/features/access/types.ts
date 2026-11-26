export type AccessState = 'locked' | 'unlocked'

export type AccessContextValue = {
  accessState: AccessState
  unlock: () => void
}
