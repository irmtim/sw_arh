import { ReactNode, useEffect, useState } from "react";
import { LoaderContext } from "../lib/LoaderContext";

interface IProps<T> {//extends WithChildren {
  request: () => Promise<T>
  children?(options: {data?: T}): ReactNode 
}

const DataLoader: <T>(p: IProps<T>) => React.ReactElement<IProps<T>> = ({request, children}) => {
  const [data, setData] = useState<any>()

  useEffect(() => reload(), [])

  const reload = () => {
    request()
      .then(v => setData(v))
  }

  return (
    <LoaderContext.Provider value={{data: data, reload: reload}}>
      {children && children({data: data})}
    </LoaderContext.Provider>
  );
};

export {DataLoader}