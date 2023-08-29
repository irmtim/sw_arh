/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import {FC} from 'react'
import {Routes, Route, Navigate, useLocation} from 'react-router-dom'
import {PrivateRoutes} from './PrivateRoutes'
import {ErrorsPage} from 'pages/errors'
import {Logout, AuthPage} from 'pages/auth'
import {App} from '../App'
import { APP_URL, LocationState, customHistory, useAuth } from 'shared'
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom"

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const {PUBLIC_URL} = process.env

const RedirectToLogin = () => {
  const {pathname} = useLocation()
  return (
    <Routes>
      <Route path='*' element={<Navigate to={APP_URL.AUTH_LOGIN} state={{from: pathname} as LocationState} />} />
    </Routes>
  )
}

const AppRoutes: FC = () => {
  const {currentUser} = useAuth()
  return (
    <HistoryRouter basename={PUBLIC_URL} history={customHistory}>
      <Routes>
        <Route element={<App />}>
          <Route path='error/*' element={<ErrorsPage />} />
          <Route path='logout' element={<Logout />} />
          <Route path='auth/*' element={<AuthPage />} />

          {currentUser ? ( 
            <>
              <Route path='/*' element={<PrivateRoutes />} />
              {/* <Route index element={<Navigate to={APP_URL.HOME} />} /> */}
            </>
          ) : (
            <>
              <Route path='*' element={<RedirectToLogin/>} />
            </>
          )}
        </Route>
      </Routes>
    </HistoryRouter>
  )
}

export {AppRoutes}
