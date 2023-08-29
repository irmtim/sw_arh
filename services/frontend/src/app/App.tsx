import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {LayoutProvider, LayoutSplashScreen} from '../shared/lib/core'
import {MasterInit} from './MasterInit'
import { AuthInit, ToastProvider } from 'shared'
import { AxiosInterceptor } from 'shared/lib/auth/AxiosInterceptor'

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <ToastProvider>
        <LayoutProvider>
          <AxiosInterceptor>
            <AuthInit>
              <Outlet />
              <MasterInit />
            </AuthInit>
          </AxiosInterceptor>
        </LayoutProvider>
      </ToastProvider>
    </Suspense>
  )
}

export {App}
