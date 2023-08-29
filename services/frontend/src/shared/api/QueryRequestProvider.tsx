import {FC, useState, createContext, useContext, useEffect} from 'react'
import { initialQueryRequest, QueryRequestContextProps, QueryState } from './models'
import { WithChildren } from 'shared'

const QueryRequestContext = createContext<QueryRequestContextProps>(initialQueryRequest)

type Props = {
  requestName: string
} 

const QueryRequestProvider: FC<Props & WithChildren> = ({requestName, children}) => {
  const getState = () : QueryState => {
    const value = localStorage.getItem(requestName)

    return (value)
      ? JSON.parse(value)
      : initialQueryRequest.state
  }
  
  const [state, setState] = useState<QueryState>(getState())

  const updateState = (updates: Partial<QueryState>) => {
    const updatedState = {...state, ...updates} as QueryState
    setState(updatedState)

    localStorage.setItem(requestName, JSON.stringify(updatedState))
  }

  return (
    <QueryRequestContext.Provider value={{state, updateState}}>
      {children}
    </QueryRequestContext.Provider>
  )
}

const useQueryRequest = () => useContext(QueryRequestContext)
export {QueryRequestProvider, useQueryRequest}
