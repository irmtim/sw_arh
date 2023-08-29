import clsx from 'clsx'
import React, {FC} from 'react'
import {KTIcon, toAbsoluteUrl} from 'shared'
import { ThemeModeSwitcher } from '../../../shared/lib/theme-mode'
import { HeaderUserMenu } from './header-menus'

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
  toolbarButtonIconSizeClass = 'fs-1'

const Topbar: FC = () => {
  return (
    <div className='d-flex align-items-stretch flex-shrink-0'>
      <div className='topbar d-flex align-items-stretch flex-shrink-0'>

        {/* begin::Theme mode */}
        <div className={'d-flex align-items-center ms-lg-5'}>
          <ThemeModeSwitcher toggleBtnClass='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px' />
        </div>
        {/* end::Theme mode */}

        {/* begin::User */}
        <div className='d-flex align-items-center ms-lg-5' id='kt_header_user_menu_toggle'>
          <div
            className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px ms-2'
            data-kt-menu-trigger='click'
            data-kt-menu-attach='parent'
            data-kt-menu-placement='bottom-end'
          >
            <KTIcon iconType='duotone' iconName='user' className='fs-1' />
          </div> 
          <HeaderUserMenu />
        </div>
        {/* end::User */}
      </div>
    </div>
  )
}

export {Topbar}
