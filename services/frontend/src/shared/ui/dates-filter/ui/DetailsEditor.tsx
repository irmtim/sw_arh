import { useEffect, useMemo } from "react";
import moment from "moment";
import { DateRange, Detalization } from "shared";
import { getDetailsArray } from "../api/modelUtils";

type Props = {
  dates: DateRange
  selected: Detalization
  onChange: (selected: Detalization) => void
}

const DetailsEditor = ({dates, selected, onChange}: Props) => {
  const items = useMemo(() => getDetailsArray(dates), [dates])

  useEffect(() => {
    if (items?.length > 0 && (!selected || items.findIndex(c => c.value === selected) < 0)) {
      onChange(items[0].value)
    }
  }, [items])

  return (
    <>
      {items.map((item, i) => (
        <div className="mb-6" key={i}>
          <div className="form-check">
            <input 
              className="form-check-input" 
              type="radio" 
              checked={selected === item.value}
              onChange={() => onChange(item.value)}
            />
            <label className="form-check-label">
              {item.name}
            </label>
          </div>
        </div>
      ))}
    </>
  );
};

export {DetailsEditor}