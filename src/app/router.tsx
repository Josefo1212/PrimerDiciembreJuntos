import { createBrowserRouter } from 'react-router'
import AccessRoute from '../features/access/AccessRoute'
import NotFoundView from '../features/access/components/NotFoundView'
import CalendarView from '../features/calendar/CalendarView.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AccessRoute />,
  },
  {
    path: '/calendar',
    element: <CalendarView />,
  },
  {
    path: '*',
    element: <NotFoundView />,
  },
])
