import { KTIcon } from "shared/ui/metronic";
import { getStringValue } from "../api/modelUtils";
import { DateRange, IDatesDetailedFilterData } from "../api/models";
import { EditModalWrapper } from "./EditModalWrapper";
import { BootstrapSize } from "shared/ui/forms";
import clsx from "clsx";

export type DatesFilterProps = {
  size?: BootstrapSize
  showDetalization?: boolean
  filter: IDatesDetailedFilterData
  onChange: (filter: IDatesDetailedFilterData) => void
  minMaxDates: DateRange
}

export const DatesFilter = ({size, showDetalization = true, filter, onChange, minMaxDates}: DatesFilterProps) => {
  return (
    <EditModalWrapper minMaxDates={minMaxDates} showDetalization={showDetalization} onSubmit={(data) => onChange(data)}>
      {({edit}) => (
        <span 
          className={clsx("btn btn-light fw-bold", size && `btn-${size}`)}
          role="button"
          onClick={() => edit(filter)}
        >
          <KTIcon iconName='filter' className='fs-6 text-muted w-15px me-1' />
          {getStringValue(filter, showDetalization)}
        </span>
      )}
    </EditModalWrapper>
  );
};