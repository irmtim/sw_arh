import { FC, useEffect, useMemo } from "react"
import { Column, useTable } from "react-table"
import { MenuComponent } from "../../../_metronic/assets/ts/components"
import { Loading } from "../loading"
import { Pagination } from "../pagination"
import { CustomHeaderColumn } from "./CustomHeaderColumn"
import { CustomRow } from "./CustomRow"
import { QueryResponseContextProps } from "shared"
import clsx from "clsx"

type Props = {
  dataTableColumns: ReadonlyArray<Column<any>>
  queryResponse: QueryResponseContextProps<any>
  onRowClick?: (data: any) => void
  hover?: boolean
}

const DataTable : FC<Props> = ({dataTableColumns, queryResponse, onRowClick, hover = false}) => {
  const data = useMemo(() => queryResponse.response?.data ?? [], [queryResponse.response?.data])
  const columns = useMemo(() => dataTableColumns, [])
  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable({
    columns,
    data,
  })

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [data])
  
  return (
    <Loading isLoaded={!queryResponse.isLoading}>
      <div className='table-responsive'>
        <table
          className={clsx('table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer', hover && 'table-hover')}
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              {headers.map((column) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row, i) => {
                prepareRow(row)
                return <CustomRow row={row} key={`row-${i}-${row.id}`} onClick={onRowClick}/>
              })
            ) : (
              <tr>
                <td colSpan={columns.length}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                    Данные не найдены
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination linksCount={5} queryResponse={queryResponse}/>
    </Loading>
  )
}

export {DataTable}