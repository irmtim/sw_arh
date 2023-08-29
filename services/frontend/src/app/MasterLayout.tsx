import {FC, useEffect} from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import {Sidebar} from './components/sidebar/Sidebar'
import {Footer} from './components/Footer'
import {HeaderWrapper} from './components/header/HeaderWrapper'
import {ScrollTop} from './components/ScrollTop'
import {Content} from './components/Content'
import {PageDataProvider, useLayout} from '../shared/lib/core'
import clsx from 'clsx'
import { WithChildren } from 'shared'
import { MenuComponent } from '_metronic'
import { ThemeModeProvider } from '../shared/lib/theme-mode'
import { Toolbar } from './components/toolbar/Toolbar'

const MasterLayout: FC<WithChildren> = ({children}) => {
  const {classes} = useLayout()

  const location = useLocation()
  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [location.key])

  return (
    <PageDataProvider>
      <ThemeModeProvider>
        <div className='page d-flex flex-column flex-column-fluid'>
          <HeaderWrapper />

          <div
            id='kt_content_container'
            className={clsx(
              'd-flex flex-column-fluid align-items-stretch',
              classes.contentContainer.join(' ')
            )}
          >

            <div
              className='wrapper d-flex flex-column flex-row-fluid mt-3'
              id='kt_wrapper'
            >
              <div className='flex-column-fluid mb-6' id='kt_content'>
                <Toolbar />
                <div className='post' id='kt_post'>
                  <Content>
                    <Outlet />
                  </Content>
                </div>
              </div>
              {/* <Footer /> */}
            </div>

            {/* <Sidebar /> */}
          </div>
        </div>

        <ScrollTop />
      </ThemeModeProvider>
    </PageDataProvider>
  )
}

export {MasterLayout}
