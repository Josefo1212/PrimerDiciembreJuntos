import { createBrowserRouter } from 'react-router'
import AccessRoute from '../features/access/AccessRoute'
import NotFoundView from '../features/access/components/NotFoundView'
import CalendarView from '../features/calendar/CalendarView.tsx'
import SurpriseView from '../features/surprises/SurpriseView.tsx'
import RequireAccess from './providers/RequireAccess.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AccessRoute />,
  },
  {
    path: '/calendar',
    element: (
      <RequireAccess>
        <CalendarView />
      </RequireAccess>
    ),
  },
  {
    path: '/surprise/:dayId',
    element: (
      <RequireAccess>
        <SurpriseView />
      </RequireAccess>
    ),
  },
  {
    path: '*',
    element: <NotFoundView />,
  },
])
