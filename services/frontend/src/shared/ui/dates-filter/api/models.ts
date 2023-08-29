export type DateRange = [Date | null, Date| null]

export interface INamedDateRange {
  name: string
  dates: DateRange
}



export enum Detalization
{
  //1 минута
  //      Minutes1 = 0,
  ////10 минут
  //      Minutes10 = 1,
  //1 час
  Hour = 2,
  //1 день
  Day = 3,
  //неделя
  Week = 4,
  //1 месяц
  Month = 5
}

export interface IDatesFilterData {
  dates: DateRange
}

export interface IDatesDetailedFilterData extends IDatesFilterData {
  detalization: Detalization
}

export const initDatesFilterData: IDatesDetailedFilterData = {
  dates: [new Date(), new Date()],
  detalization: Detalization.Hour
}