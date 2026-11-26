import type { ReactElement } from 'react'
import { RouterProvider } from 'react-router/dom'
import AccessProvider from './providers/AccessProvider'
import ProgressProvider from './providers/ProgressProvider'
import { router } from './router'

const App = (): ReactElement => (
  <AccessProvider>
    <ProgressProvider>
      <RouterProvider router={router} />
    </ProgressProvider>
  </AccessProvider>
)

export default App
