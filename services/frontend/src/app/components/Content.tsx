import {FC, useEffect} from 'react'
import {useLocation} from 'react-router'
import clsx from 'clsx'
import { WithChildren } from 'shared'
import { DrawerComponent } from '_metronic'

const Content: FC<WithChildren> = ({children}) => {
  const location = useLocation()
  useEffect(() => {
    DrawerComponent.hideAll()
  }, [location])

  return (
    <div id='kt_content_container' className={clsx('content flex-row-fluid')}>
      {children}
    </div>
  )
}

export {Content}
