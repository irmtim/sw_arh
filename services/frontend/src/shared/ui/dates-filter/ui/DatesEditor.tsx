import { DateRange, DateRangePicker } from "shared";
import { useMemo } from "react";
import { getDateRanges, isRangeSelected } from "../api/modelUtils";

type Props = {
  minMaxDates: DateRange
  dates: DateRange
  onChange: (dates: DateRange) => void
}

const DatesEditor = ({minMaxDates, dates, onChange}: Props) => {
  const dateRanges = useMemo(() => getDateRanges(minMaxDates), [])

  return (
    <>
      {dateRanges.map((item, i) => (
        <div className="mb-6" key={i}>
          <div className="form-check">
            <input 
              className="form-check-input" 
              type="radio" 
              checked={isRangeSelected(dates, item)}
              onChange={() => onChange(item.dates)}
            />
            <label className="form-check-label">
              {item.name}
            </label>
          </div>
        </div>
      ))}
      <DateRangePicker 
        dates={dates}
        minDate={minMaxDates[0]}
        maxDate={minMaxDates[1]}
        onChange={onChange} 
        className="form-control-solid"
        placeholder="Все время" />
    </>
  );
};

export {DatesEditor}