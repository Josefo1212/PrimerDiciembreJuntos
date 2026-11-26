import { useCallback, useState, type ChangeEvent, type FormEvent } from 'react'
import { getAccessError } from '../rules/accessRules'

type UseAccessFormProps = {
  onSuccess: () => void
}

type UseAccessFormResult = {
  code: string
  error: string | null
  handleCodeChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export const useAccessForm = ({ onSuccess }: UseAccessFormProps): UseAccessFormResult => {
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleCodeChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    setCode(event.target.value)
  }, [])

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>): void => {
      event.preventDefault()

      const accessError = getAccessError(code)
      setError(accessError)

      if (accessError === null) {
        onSuccess()
      }
    },
    [code, onSuccess],
  )

  return { code, error, handleCodeChange, handleSubmit }
}
