import { FieldHookConfig, useField } from "formik";
import ReactDatePicker from "react-datepicker";

type Props = {

}

const TimePickerField = (props: FieldHookConfig<Date> & Props) => {
  const [field, meta, helpers] = useField(props.name);

  const { value } = meta;
  const { setValue } = helpers;

  const onChange = (val: Date | null) => {
    setValue(val)
  }

  return (
    <ReactDatePicker
      selected={value ? new Date(value) : undefined}
      onChange={onChange}
      className={props.className}
      showTimeSelect
      showTimeSelectOnly
      // locale="ru"
      timeIntervals={15}
      timeCaption="Время"
      dateFormat="HH:mm"
    />
  );
};

export {TimePickerField}