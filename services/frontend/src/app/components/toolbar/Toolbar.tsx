import clsx from 'clsx'
import React from 'react'
import { DefaultTitle } from '../header/page-title/DefaultTitle'
import { useLayout, usePageData } from 'shared'

const Toolbar = () => {
  const {toolBarActions, showToolBar} = usePageData()
  const {classes} = useLayout()

  return (
    <>
      {showToolBar && (
        <div className='toolbar mb-3' id='kt_toolbar'>
          {/* begin::Container */}
          <div
            id='kt_toolbar_container'
            className={clsx(classes.toolbarContainer.join(' '), 'd-flex flex-column flex-md-row justify-content-between')}
          >
            <DefaultTitle />

            {/* begin::Actions */}
            <div className='d-flex align-items-center py-1'>
              {toolBarActions}
            </div>
            {/* end::Actions */}
            {/* end::Container */}
          </div>
        </div>
      )}
    </>
  )

  
}

export {Toolbar}
