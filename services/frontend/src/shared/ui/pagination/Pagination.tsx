/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import { FC, useEffect } from 'react'
import { KTIcon } from '../metronic'
import { ItemsPerPageType, QueryResponseContextProps, useQueryRequest, useQueryResponseLoading, useQueryResponsePagination } from 'shared'

type Props = {
  linksCount?: 1 | 2 | 3 | 4 | 5
  // itemsPerPage?: 5 | 10 | 30 | 50 | 100
  showAnnotation?: boolean
  showItemsPerPage?: boolean
  queryResponse?: QueryResponseContextProps<any>
}

const Pagination: FC<Props>= ({linksCount = 5, showAnnotation = true, showItemsPerPage = true, queryResponse}) => {
  const pagination = useQueryResponsePagination(queryResponse)
  const isLoading = useQueryResponseLoading(queryResponse)
  const {updateState} = useQueryRequest()

  // useEffect(() => {
  //   updateState({itemsPerPage: itemsPerPage as ItemsPerPageType})
  // }, [])

  const updatePage = (page: number | null) => {
    if (!page || isLoading || pagination.page === page) {
      return
    }

    updateState({page})
  }

  const updateItemsPerPage = (itemsPerPage: number) => {
    console.log(itemsPerPage)
    if (!itemsPerPage || isLoading || (pagination.itemsPerPage === itemsPerPage)) {
      return
    }

    updateState({itemsPerPage: itemsPerPage as ItemsPerPageType})
  }
  //page=5
  //pagesCount = 50
  function getLinks(): number[] {
    //0
    const start = Math.floor((pagination.page - 1) / linksCount) * linksCount;
    //5
    var end = start + linksCount;
    
    if (end > pagination.pagesCount) {
      end = pagination.pagesCount;
    }

    var links = []
    for (var i = start; i < end; i++)
    {
      links.push(i + 1);
    }
    return links;
  }

  const getAnnotation = () => {
    if (pagination.totalCount === 0) return '';
     
    const start = (pagination.page - 1) * pagination.itemsPerPage + 1;
    var end = start + pagination.itemsPerPage;
    if (end > pagination.totalCount) {
      end = pagination.totalCount;
    }
    return `Показано ${start} - ${end} из ${pagination.totalCount} записей`;
  } 

  return (
    <div className='row'>
      <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'>
        {showItemsPerPage && (
          <div className='w-70px'>
            <select 
                className='form-select form-select-sm form-select-solid' 
                data-control='select2' 
                data-hide-search='true' 
                value={pagination.itemsPerPage}
                onChange={e => updateItemsPerPage(+e.target.value)}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
            </select> 
          </div>
        )}
        {showAnnotation && (<div className='ms-2'>{getAnnotation()}</div>)}
      </div>
      <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
        <div id='kt_table_users_paginate'>
          <ul className='pagination'>
            {/*First*/}
            <li
              key={'first'}
              className={clsx('page-item', {
                disabled: pagination.page === 1,
              })}
            >
              <a
                className='page-link'
                onClick={() => updatePage(1)}
                style={{cursor: 'pointer'}}
              >
                <KTIcon iconName='double-left' className='fs-2'/>
              </a>
            </li>
            {/*Previous*/}
            <li
              key={'prev'}
              className={clsx('page-item', {
                disabled: pagination.page === 1,
              })}
            >
              <a
                className='page-link'
                onClick={() => updatePage(pagination.page - 1)}
                style={{cursor: 'pointer'}}
              >
                <KTIcon iconName='left' className='fs-2'/>
              </a>
            </li>
            {getLinks()
              .map((link) => (
                <li
                  key={link}
                  className={clsx('page-item', {
                    active: pagination.page === link,
                    disabled: isLoading,
                    previous: false,
                    next: false,
                  })}
                >
                  <a
                    className='page-link'
                    onClick={() => updatePage(link)}
                    style={{cursor: 'pointer'}}
                  >
                    {link}
                  </a>
                </li>
              ))}
              {/*Next*/}
              <li
                key={'next'}
                className={clsx('page-item', {
                  disabled: pagination.page === pagination.pagesCount,
                })}
              >
                <a
                  className='page-link'
                  onClick={() => updatePage(pagination.page + 1)}
                  style={{cursor: 'pointer'}}
                >
                  <KTIcon iconName='right' className='fs-2'/>
                </a>
              </li>
              {/*Last*/}
              <li
                key={'last'}
                className={clsx('page-item', {
                  disabled: pagination.page === pagination.pagesCount,
                })}
              >
                <a
                  className='page-link'
                  onClick={() => updatePage(pagination.pagesCount)}
                  style={{cursor: 'pointer'}}
                >
                  <KTIcon iconName='double-right' className='fs-2'/>
                </a>
              </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export {Pagination}
