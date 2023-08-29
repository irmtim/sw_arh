/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx'
import React from 'react'
import {Link} from 'react-router-dom'
import {Header} from './Header'
import {Topbar} from './Topbar'
import { APP_URL, KTIcon, toAbsoluteUrl, useLayout } from 'shared'
import { useThemeMode } from '../../../shared/lib/theme-mode'

export function HeaderWrapper() {
  const {config, classes, attributes} = useLayout()
  const {header, aside} = config
  const {mode} = useThemeMode()

  return (
    <div
      id='kt_header'
      className={clsx('header', classes.header.join(' '), 'align-items-stretch')}
      {...attributes.headerMenu}
    >
      <div
        className={clsx(
          classes.headerContainer.join(' '),
          'd-flex align-items-stretch justify-content-between'
        )}
      >
        <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0 me-5 me-md-10 '>
          <div className='d-flex d-lg-none align-items-center ms-n2 me-2' title='Show header menu'>
            <button
              className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
              id='kt_header_menu_mobile_toggle'
            >
              <KTIcon iconName='abstract-14' className='fs-1' />
            </button>
          </div>

          <Link to={APP_URL.INDEX}>
            {/* {mode === 'light' && (
              <img
                alt='Logo'
                src={toAbsoluteUrl('/media/logos/demo5.svg')}
                className='d-none d-lg-inline h-30px theme-light-show'
              />
            )}
            {mode === 'dark' && (
              <img
                alt='Logo'
                src={toAbsoluteUrl('/media/logos/demo5-dark.svg')}
                className='d-none d-lg-inline h-30px theme-dark-show'
              />
            )} */}
            <img
              alt='Logo'
              src={toAbsoluteUrl('/media/logos/logo.png')}
              className='h-25px'
            />
          </Link>
        </div>

        <div className='d-flex align-items-stretch justify-content-between flex-lg-grow-1'>
          <div className='d-flex align-items-stretch'>
            {header.left === 'menu' && (
              <div className='d-flex align-items-stretch' id='kt_header_nav'>
                <Header />
              </div>
            )}
          </div>

          <Topbar />
        </div>
      </div>
    </div>
  )
}
