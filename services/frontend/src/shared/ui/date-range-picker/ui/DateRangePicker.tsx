import clsx from "clsx";
import moment from "moment";
import { FC } from "react";
import ReactDatePicker from "react-datepicker";
import { DateRange, KTIcon } from "shared";

const DATE_FORMAT = "dd/MM/yyyy"


type Props = {
  dates: DateRange
  onChange: (dates: [Date | null, Date | null]) => void
  className?: string
  placeholder?: string
  minDate?: Date | null
  maxDate?: Date | null
}

const DateRangePicker: FC<Props> = ({dates, onChange, className, placeholder, minDate, maxDate}) => {

  return (
    <ReactDatePicker
      dateFormat={DATE_FORMAT}
      selected={dates[0]}
      startDate={dates[0]}
      endDate={dates[1]}
      minDate={minDate}
      maxDate={maxDate}
      locale="ru"
      onChange={onChange}
      selectsRange
      placeholderText={placeholder}
      className={clsx(className, "form-control w-md-200px")}
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="align-items-center d-flex justify-content-between pagination">
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} type='button'
            className="page-link">
            <KTIcon iconName='left' className='fs-2'/>
            {/* <KTSVG path='/media/icons/duotune/arrows/arr074.svg' className='svg-icon svg-icon-2' /> */}
          </button>
          <span className="fw-bold">{moment(date).format('MMMM yyyy')}</span>
          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} type='button'
            className="page-link">
            <KTIcon iconName='right' className='fs-2'/>
          </button>
        </div>
      )}
    />
  );
};

export {DateRangePicker}