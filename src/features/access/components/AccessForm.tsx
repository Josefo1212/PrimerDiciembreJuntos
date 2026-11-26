import type { ReactElement } from 'react'
import { useAccessForm } from '../hooks/useAccessForm'
import styles from './AccessForm.module.css'

type AccessFormProps = {
  onSuccess: () => void
}

const AccessForm = ({ onSuccess }: AccessFormProps): ReactElement => {
  const { code, error, handleCodeChange, handleSubmit } = useAccessForm({ onSuccess })

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label className={styles.label} htmlFor="access-code">
        Código secreto
      </label>
      <input
        className={styles.input}
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
        <p className={styles.error} id="access-error" role="alert">
          <span className={styles.errorMark} aria-hidden="true" />
          {error}
        </p>
      )}

      <button className={styles.button} type="submit">
        Entrar
      </button>
    </form>
  )
}

export default AccessForm
