/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, createContext, useContext, useEffect, useState, ReactNode} from 'react'
import { WithChildren } from 'shared'

export interface PageLink {
  title?: string
  icon?: string
  path?: string
  isActive: boolean
  isSeparator?: boolean
}

export interface PageDataContextModel {
  pageTitle?: string
  setPageTitle: (_title: string) => void
  pageDescription?: string
  setPageDescription: (_description: string) => void
  showToolBar: boolean
  setShowToolBar: (_show: boolean) => void
  pageBreadcrumbs?: Array<PageLink>
  setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => void
  toolBarActions?: ReactNode
  setToolBarActions: (_toolBarActions: ReactNode) => void,
  aside?: boolean
  setAside: (_aside: boolean) => void
}

const PageDataContext = createContext<PageDataContextModel>({
  setPageTitle: (_title: string) => {},
  setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => {},
  setPageDescription: (_description: string) => {},
  showToolBar: true,
  setShowToolBar: (_show: boolean) => {},
  setToolBarActions: (_toolBarActions: ReactNode) => null,
  aside: true,
  setAside: (_aside: boolean) => {},
})

const PageDataProvider: FC<WithChildren> = ({children}) => {
  const [pageTitle, setPageTitle] = useState<string>('')
  const [pageDescription, setPageDescription] = useState<string>('')
  const [showToolBar, setShowToolBar] = useState<boolean>(true)
  const [pageBreadcrumbs, setPageBreadcrumbs] = useState<Array<PageLink>>([])
  const [toolBarActions, setToolBarActions] = useState<ReactNode>()
  const [aside, setAside] = useState<boolean>(false)
  const value: PageDataContextModel = {
    pageTitle,
    setPageTitle,
    pageDescription,
    setPageDescription,
    showToolBar,
    setShowToolBar,
    pageBreadcrumbs,
    setPageBreadcrumbs,
    toolBarActions,
    setToolBarActions,
    aside,
    setAside
  }
  return <PageDataContext.Provider value={value}>{children}</PageDataContext.Provider>
}

function usePageData() {
  return useContext(PageDataContext)
}

type Props = {
  description?: string
  breadcrumbs?: Array<PageLink>
  toolBarActions?: ReactNode
  showToolBar?: boolean
}

const PageTitle: FC<Props & WithChildren> = ({children, description, breadcrumbs, toolBarActions, showToolBar = true}) => {
  const {setPageTitle, setPageDescription, setPageBreadcrumbs, setToolBarActions, setShowToolBar} = usePageData()
  useEffect(() => {
    if (children) {
      setPageTitle(children.toString())
    }
    return () => {
      setPageTitle('')
    }
  }, [children])

  //document title
  useEffect(() => {
    document.title = `${children?.toString()} | Поминовения`
  }, [children])

  useEffect(() => {
    if (description) {
      setPageDescription(description)
    }
    return () => {
      setPageDescription('')
    }
  }, [description])

  useEffect(() => {
    if (breadcrumbs) {
      setPageBreadcrumbs(breadcrumbs)
    }
    return () => {
      setPageBreadcrumbs([])
    }
  }, [breadcrumbs])

  useEffect(() => {
    if (toolBarActions) {
      setToolBarActions(toolBarActions)
    }
    return () => {
      setToolBarActions(null)
    }
  }, [toolBarActions])

  useEffect(() => {
    setShowToolBar(showToolBar)
  }, [showToolBar])

  return <></>
}

const PageDescription: FC<WithChildren> = ({children}) => {
  const {setPageDescription} = usePageData()
  useEffect(() => {
    if (children) {
      setPageDescription(children.toString())
    }
    return () => {
      setPageDescription('')
    }
  }, [children])
  return <></>
}

export {PageDescription, PageTitle, PageDataProvider, usePageData}