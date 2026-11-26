import { useState, type FormEvent, type ReactElement } from 'react'
import {
  clearPreviewDate,
  formatPreviewDate,
  getPreviewDate,
  setPreviewDate,
} from '../../../shared/time/previewDate.ts'
import styles from './DevDatePanel.module.css'

type DevDatePanelProps = {
  onPreviewDateChange: () => void
}

const DevDatePanel = ({ onPreviewDateChange }: DevDatePanelProps): ReactElement | null => {
  const [value, setValue] = useState(() => formatPreviewDate(getPreviewDate() ?? new Date()))
  const [activeDate, setActiveDate] = useState(() => {
    const previewDate = getPreviewDate()

    return previewDate === null ? null : formatPreviewDate(previewDate)
  })
  const [message, setMessage] = useState('')

  if (!import.meta.env.DEV) {
    return null
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    if (!setPreviewDate(value)) {
      setMessage('La fecha introducida no es válida.')

      return
    }

    const previewDate = getPreviewDate()
    setActiveDate(previewDate === null ? null : formatPreviewDate(previewDate))
    setMessage(`Fecha de prueba aplicada: ${value}.`)
    onPreviewDateChange()
  }

  const handleClear = (): void => {
    clearPreviewDate()
    setValue(formatPreviewDate(new Date()))
    setActiveDate(null)
    setMessage('Volviendo a la fecha real del dispositivo.')
    onPreviewDateChange()
  }

  return (
    <form className={styles.panel} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="preview-date">
        Fecha de prueba
      </label>
      <input
        className={styles.input}
        id="preview-date"
        onChange={(event) => setValue(event.target.value)}
        type="date"
        value={value}
      />
      <button className={styles.button} type="submit">
        Aplicar fecha
      </button>
      <button className={styles.secondaryButton} onClick={handleClear} type="button">
        Usar fecha real
      </button>
      <p className={styles.status} role="status">
        {activeDate === null
          ? 'Usando la fecha real del dispositivo.'
          : `Fecha de prueba activa: ${activeDate}.`}
        {message !== '' && ` ${message}`}
      </p>
    </form>
  )
}

export default DevDatePanel
