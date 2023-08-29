import { createContext, useContext } from "react"

interface LoaderContextProps<T> {
  data: T
  reload: () => void
}

const initLoaderContextProps: LoaderContextProps<any> = {
  data: undefined,
  reload: () => {}
}

const LoaderContext = createContext<LoaderContextProps<any>>(initLoaderContextProps)

const useLoader = <T>() => {
  const context = useContext<LoaderContextProps<T>>(
    (LoaderContext as unknown) as React.Context<LoaderContextProps<T>>
  );
  if (!context) {
    throw new Error('useLoader must be used under Loader');
  }
  return context;
}

export {
  LoaderContext,
  useLoader
}