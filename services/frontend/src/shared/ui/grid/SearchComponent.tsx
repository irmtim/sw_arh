/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, FC} from 'react'
import { KTIcon } from '../metronic'
import { BootstrapSize, QueryRequestContextProps, useDebounce } from 'shared'
import clsx from 'clsx'

type Props = {
  queryRequest: QueryRequestContextProps
  size?: BootstrapSize
  className?: string
}

const SearchComponent: FC<Props> = ({queryRequest, size, className}) => {
  const {state, updateState} = queryRequest

  const [searchTerm, setSearchTerm] = useState<string | undefined>(state.search)
  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 500ms.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchTerm = useDebounce(searchTerm, 150)
  // Effect for API call
  useEffect(
    () => {
      if (debouncedSearchTerm !== undefined && searchTerm !== undefined) {
        updateState({search: debouncedSearchTerm, page: 1})
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
    // More details about useDebounce: https://usehooks.com/useDebounce/
  )

  return (
    <div className={clsx('card-title d-flex flex-grow-1 flex-md-grow-0 me-0', className)}>
      {/* begin::Search */}
      <div className='align-items-center d-flex flex-grow-1 flex-sm-grow-0 position-relative'>
        <KTIcon iconName='magnifier' className='svg-icon-1 position-absolute ms-6'/>
        {/* <KTSVG
          path='/media/icons/duotune/general/gen021.svg'
          className='svg-icon-1 position-absolute ms-6'
        /> */}
        <input
          type='text'
          data-kt-user-table-filter='search'
          className={clsx('form-control form-control-solid ps-14', size && `form-control-${size}`)}
          placeholder='Поиск...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* end::Search */}
    </div>
  )
}

export {SearchComponent}
