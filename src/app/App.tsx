import type { ReactElement } from 'react'
import AccessRoute from '../features/access/AccessRoute'
import AccessProvider from './providers/AccessProvider'

const App = (): ReactElement => (
  <AccessProvider>
    <AccessRoute />
  </AccessProvider>
)

export default App
