import {FC, lazy, Suspense} from 'react'
import {Navigate, Route, Routes, useLocation} from 'react-router-dom'
import {MasterLayout} from '../MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {DisableSidebar} from '../../shared/lib/core'
import {APP_URL, WithChildren} from 'shared'

const PrivateRoutes = () => {

  const SwitchesListPage = lazy(() => import('pages/switches-list'))
  const SwitchViewPage = lazy(() => import('pages/switch-view'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>

        {/* Переход на страницу коммутаторов */}
        <Route index element={<Navigate to={APP_URL.SWITCHES_INDEX} replace/>} />

        <Route path='switches'>
          <Route index element={<SuspensedView><SwitchesListPage/></SuspensedView>} />
          <Route path=':id' element={<SuspensedView><SwitchViewPage/></SuspensedView>}/>
        </Route>

        {/* Page Not Found */}
        <Route path='*' element={<Navigate to={APP_URL.ERROR_404} replace/>} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return (
    <Suspense fallback={<TopBarProgress />}>
      <DisableSidebar>{children}</DisableSidebar>
    </Suspense>
  )
}

export {PrivateRoutes}
