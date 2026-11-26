import type { ReactElement } from 'react'
import { useAccessForm } from '../hooks/useAccessForm'
import './AccessForm.css'

type AccessFormProps = {
  onSuccess: () => void
}

const AccessForm = ({ onSuccess }: AccessFormProps): ReactElement => {
  const { code, error, handleCodeChange, handleSubmit } = useAccessForm({ onSuccess })

  return (
    <form className="accessForm" onSubmit={handleSubmit} noValidate>
      <label className="accessForm__label" htmlFor="access-code">
        Código secreto
      </label>
      <input
        className="accessForm__input"
        id="access-code"
        name="code"
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={code}
        onChange={handleCodeChange}
        aria-invalid={error !== null}
        aria-describedby={error !== null ? 'access-error' : undefined}
      />

      {error !== null && (
        <p className="accessForm__error" id="access-error" role="alert">
          <span className="accessForm__errorMark" aria-hidden="true" />
          {error}
        </p>
      )}

      <button className="accessForm__button" type="submit">
        Entrar
      </button>
    </form>
  )
}

export default AccessForm
