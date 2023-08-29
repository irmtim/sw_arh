import moment from "moment"
import { DateRange, Detalization, IDatesDetailedFilterData, INamedDateRange } from "./models"

export const isRangeSelected = (range: DateRange, item: INamedDateRange) => {
  return range[0]?.getTime() === item.dates[0]?.getTime() && range[1]?.getTime() === item.dates[1]?.getTime()
}

export const getDateRanges = (dates: DateRange): INamedDateRange[] => {
  let arr: INamedDateRange[] = []

  //сегодня
  let start = new Date()
  start.setHours(0, 0, 0, 0)

  let end = new Date()
  end.setHours(23, 59, 59, 999)

  arr.push({
    name: 'Сегодня',
    dates: [start, end]
  })

  //вчера
  // start.setDate(start.getDate() - 1)

  // end.setDate(end.getDate() - 1)

  // arr.push({
  //   name: 'Вчера',
  //   start: start,
  //   end: end
  // })

  //неделя
  start = new Date()
  start.setHours(0, 0, 0, 0)
  start.setDate(start.getDate() - 7)

  end = new Date()
  end.setHours(23, 59, 59, 999)

  arr.push({
    name: 'Неделя',
    dates: [start, end]
  })

  //месяц
  start = new Date()
  start.setHours(0, 0, 0, 0)
  start.setMonth(start.getMonth() - 1)

  end = new Date()
  end.setHours(23, 59, 59, 999)

  arr.push({
    name: 'Месяц',
    dates: [start, end]
  })

  //квартал
  // start = new Date()
  // start.setHours(0, 0, 0, 0)
  // start.setMonth(start.getMonth() - 3)

  // end = new Date()
  // end.setHours(23, 59, 59, 999)

  // arr.push({
  //   name: 'Квартал',
  //   start: start,
  //   end: end
  // })

  //год
  start = new Date()
  start.setHours(0, 0, 0, 0)
  start.setFullYear(start.getFullYear() - 1)

  end = new Date()
  end.setHours(23, 59, 59, 999)

  arr.push({
    name: 'Год',
    dates: [start, end]
  })

  //all
  arr.push({
    name: 'Все время',
    dates: [dates[0], dates[1]]
  })

  return arr
}

export const getStringValue = (data: IDatesDetailedFilterData, showDetalization: boolean) => {
  let result = `${moment(data.dates[0]).format('DD/MM/YYYY')}-${moment(data.dates[1]).format('DD/MM/YYYY')}`

  if (showDetalization) {
    switch (data.detalization) {
      case Detalization.Day:
        result += ', по дням'
        break;
      case Detalization.Week:
        result += ', по неделям'
        break;
      case Detalization.Month:
        result += ', по месяцам'
        break;
    }
  }

  return result
}

export const getDetailsArray = (dates: DateRange) => {
  let result = []
    const days = moment(dates[1]).diff(moment(dates[0]), 'days')

    /*
      1 час (1 - 7 дней)
      1 день (7 - 50 дней)
      1 неделя (14 - 210)
      1 месяц (80 - 700)
    */
    if (days >= 0 && days <= 7) {
      var c = { 
        name: "Час", 
        value: Detalization.Hour
      }
      result.push(c)
    }

    if (days >= 7 && days <= 50) {
      var c = { 
        name: "День", 
        value: Detalization.Day
      }
      result.push(c)
    }

    if (days >= 14 && days <= 210) {
      var c = { 
        name: "Неделя", 
        value: Detalization.Week
      }
      result.push(c)
    }

    if (days >= 80 /*&& days <= 700*/) {
      var c = { 
        name: "Месяц", 
        value: Detalization.Month
      }
      result.push(c)
    }

    return result
}