import { useState } from "react";
import {DatesFilterContext} from '../lib/DatesFilterContext'
import { WithChildren } from "shared/lib";
import { Detalization, IDatesFilterData, IDatesDetailedFilterData } from "../api/models";


type Props = WithChildren & {
  // request: () => Promise<T>
  // children?(options: {data: T}): ReactNode 
}

const DatesFilterProvider = ({children}: Props) => {
  const [filter, setFilter] = useState<IDatesDetailedFilterData>({dates: [new Date(2020, 10, 1), new Date()], detalization: Detalization.Day})

  const updateFilter = (data: IDatesDetailedFilterData) => {
    console.log(filter.dates)
    setFilter(data)
  }

  return (
    <DatesFilterContext.Provider value={{filter, updateFilter}}>
      {children}
    </DatesFilterContext.Provider>
  );
};




export {DatesFilterProvider}