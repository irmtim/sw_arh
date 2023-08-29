/* eslint-disable react-hooks/exhaustive-deps */
import {FC, useContext, useState, useEffect, useMemo} from 'react'
import {useQuery} from 'react-query'
import { createResponseContext, stringifyRequestQuery } from './helpers'
import { initialQueryResponse, initialQueryState, PaginationState, QueryResponseContextProps } from './models'
import {useQueryRequest} from './QueryRequestProvider'

const QueryResponseContext = createResponseContext<any>(initialQueryResponse)
const QueryResponseProvider: FC<any> = ({children, getRequest, requestName = 'MyRequest'}) => {
  const {state} = useQueryRequest()
  const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
  const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery)
    }
  }, [updatedQuery])

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
      `${requestName}-${query}`,
    () => {
      return getRequest(state)
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  return (
    <QueryResponseContext.Provider value={{isLoading: isFetching, refetch, response, query}}>
      {children}
    </QueryResponseContext.Provider>
  )
}

const useQueryResponse = () => useContext(QueryResponseContext)

const useQueryResponseData = (queryResponse?: QueryResponseContextProps<any>) => {
  const defaultResponse = useQueryResponse()

  const {response, query} = queryResponse ?? defaultResponse
    if (!response) {
      // console.log('!response')
    return []
    }
    // console.log('useQueryResponseData')
    // console.log(response)
  return response?.data || []
}

const useQueryResponsePagination = (queryResponse?: QueryResponseContextProps<any>) => {
  const defaultPaginationState: PaginationState = {
    // links: [],
    ...initialQueryState,
  }

  const defaultResponse = useQueryResponse()

  const {response} = queryResponse ?? defaultResponse
  if (!response || !response.pagination) {
    return defaultPaginationState
  }

  return response.pagination
}

const useQueryResponseLoading = (queryResponse?: QueryResponseContextProps<any>): boolean => {
  const defaultResponse = useQueryResponse()

  const {isLoading} = queryResponse ?? defaultResponse
  return isLoading
}

export {
  QueryResponseProvider,
  useQueryResponse,
  useQueryResponseData,
  useQueryResponsePagination,
  useQueryResponseLoading,
}
