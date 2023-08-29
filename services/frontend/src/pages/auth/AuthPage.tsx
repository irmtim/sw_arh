/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import {Login} from './components/Login'
import {toAbsoluteUrl} from 'shared'

const AuthLayout = () => {
  useEffect(() => {
    document.body.style.backgroundImage = 'none'
    return () => {}
  }, [])

  return (
    <div
      className='d-flex flex-column flex-column-fluid position-x-center bg-body'
      // style={{
      //   backgroundImage: `url(${toAbsoluteUrl('/media/illustrations/sketchy-1/14.png')})`,
      // }}
    >
      {/* begin::Content */}
      <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
        {/* begin::Logo */}
        <a href='#' className='mb-12'>
          <div className='d-flex align-items-center'>
            <img
              alt='Logo'
              src={toAbsoluteUrl('/media/logos/logo.png')}
              className='h-45px'
            />
            <span className="ms-4 fs-2tx fw-bold text-gray-800">
              SW_ARH
            </span>
          </div>
          
        </a>
        {/* end::Logo */}
        {/* begin::Wrapper */}
        <div className='card card-flush p-10 p-lg-15 mx-auto w-lg-500px '>
          <Outlet />
        </div>
        {/* end::Wrapper */}
      </div>
      {/* end::Content */}
    </div>
  )
}

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export {AuthPage}
