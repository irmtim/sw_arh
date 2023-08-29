import { ReactNode, useEffect, useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { LoaderContext } from "../lib/LoaderContext";



interface IProps<T> {//extends WithChildren {
  request: () => Promise<T>
  children?(options: {data: T}): ReactNode 
}

const Loader: <T>(p: IProps<T>) => React.ReactElement<IProps<T>> = ({request, children}) => {
  const [data, setData] = useState<any>()

  // const LoaderContext = useMemo(() => createContext<LoaderContextProps<any>>(initLoaderContextProps), [])

  useEffect(() => {
    request()
      .then(v => setData(v))
  }, [])

  return (
    <LoaderContext.Provider value={{data: data, reload: request}}>
      {data 
        ? children && children({data: data})
        : <LoadingSpinner data={data}/>}
    </LoaderContext.Provider>
  );
};




export {Loader}