import {Dispatch, SetStateAction} from 'react'

export interface GridModel {
  id: string
}

export type ID = undefined | null | number | string

export type ItemsPerPageType = 5 | 10 | 30 | 50 | 100

export type PaginationState = {
    page: number
    pagesCount: number
    totalCount: number
    itemsPerPage: ItemsPerPageType
    //???
    // links?: Array<{ label: string; active: boolean; url: string | null; page: number | null }>
}

export type SortState = {
  sort?: string
  order?: 'asc' | 'desc'
}

export type FilterState = {
  filter?: unknown
}

export type SearchState = {
  search?: string
}

export type Response<T> = {
    data?: T
    pagination?: PaginationState
}

export type QueryState = PaginationState & SortState & FilterState & SearchState

export type QueryRequestContextProps = {
  state: QueryState
  updateState: (updates: Partial<QueryState>) => void
}

export const initialQueryState: QueryState = {
    page: 1,
    pagesCount: 0,
    totalCount: 0,
    itemsPerPage: 10,
}

export const initialQueryRequest: QueryRequestContextProps = {
  state: initialQueryState,
  updateState: () => {},
}

export type QueryResponseContextProps<T> = {
  response?: Response<Array<T>> | undefined
  refetch: () => void
  isLoading: boolean
  query: string
}

export const initialQueryResponse = {refetch: () => {}, isLoading: false, query: ''}

export type ListViewContextProps = {
  selected: Array<ID>
  onSelect: (selectedId: ID) => void
  onSelectAll: () => void
  clearSelected: () => void
  // NULL => (CREATION MODE) | MODAL IS OPENED
  // NUMBER => (EDIT MODE) | MODAL IS OPENED
  // UNDEFINED => MODAL IS CLOSED
  itemIdForUpdate?: ID
  setItemIdForUpdate: Dispatch<SetStateAction<ID>>
  isAllSelected: boolean
  disabled: boolean
}

export const initialListView: ListViewContextProps = {
  selected: [],
  onSelect: () => {},
  onSelectAll: () => {},
  clearSelected: () => {},
  setItemIdForUpdate: () => {},
  isAllSelected: false,
  disabled: false,
}

/* RESULT */
export interface ResultResponse {
  error?: string,
  errorCode?: number,
  additionalInfo?: any,
  // Success: boolean
}

export type ReadOnlyElement = {
  readOnly?: boolean
}