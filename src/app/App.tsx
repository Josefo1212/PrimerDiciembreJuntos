import type { ReactElement } from 'react'
import { RouterProvider } from 'react-router/dom'
import AccessProvider from './providers/AccessProvider'
import { router } from './router'

const App = (): ReactElement => (
  <AccessProvider>
    <RouterProvider router={router} />
  </AccessProvider>
)

export default App
