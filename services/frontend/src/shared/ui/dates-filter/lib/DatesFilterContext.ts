import { createContext, useContext } from "react"
import { IDatesDetailedFilterData, initDatesFilterData } from "../api/models"

interface DatesFilterContextProps {
  filter: IDatesDetailedFilterData
  updateFilter: (data: IDatesDetailedFilterData) => void
}

const initDatesFilterContextProps: DatesFilterContextProps = {
  filter: initDatesFilterData,
  updateFilter: (data: IDatesDetailedFilterData) => {}
}

const DatesFilterContext = createContext<DatesFilterContextProps>(initDatesFilterContextProps)

// const useDatesFilter = <T>() => {
//   const context = useContext<DatesFilterContextProps>(
//     (DatesFilterContext as unknown) as React.Context<DatesFilterContextProps>
//   );
//   if (!context) {
//     throw new Error('useDatesFilter must be used under DatesFilterProvider');
//   }
//   return context;
// }

const useDatesFilter = () => useContext(DatesFilterContext)

export {
  DatesFilterContext,
  useDatesFilter
}