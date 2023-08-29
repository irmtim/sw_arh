import { FC, useEffect, useMemo } from "react"
import { MenuComponent } from "_metronic/assets/ts/components"
import { Loading } from "../loading"
import { Pagination } from "../pagination"
import { QueryResponseContextProps } from "shared"
import clsx from "clsx"

type Props = {
  renderItem: (data: any, key: number) => JSX.Element
  queryResponse: QueryResponseContextProps<any>
  className?: string
  showItemsPerPage?: boolean
}

const DataGrid : FC<Props> = ({renderItem, queryResponse, className, showItemsPerPage}) => {
  const data = useMemo(() => queryResponse.response?.data ?? [], [queryResponse.response?.data])

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [data])
  
  return (
    <Loading isLoaded={!queryResponse.isLoading}>
      <div className={className}>
        <div className="my-6 my-lg-9">
          {data.map((item, i, arr) => (
            <div key={i} className={clsx("my-3", i < arr.length-1 && "border-bottom-1 border-bottom-dashed border-gray-300 pb-3")}>
              {renderItem(item, i)}
            </div>
          ))}
        </div>
        <Pagination queryResponse={queryResponse} showItemsPerPage={showItemsPerPage}/>
      </div>
    </Loading>
  )
}

export {DataGrid}