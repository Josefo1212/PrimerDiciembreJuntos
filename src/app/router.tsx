import { createBrowserRouter } from 'react-router'
import AccessRoute from '../features/access/AccessRoute'
import NotFoundView from '../features/access/components/NotFoundView'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AccessRoute />,
  },
  {
    path: '*',
    element: <NotFoundView />,
  },
])
