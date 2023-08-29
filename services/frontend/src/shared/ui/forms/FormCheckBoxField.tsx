import { FieldHookConfig, useField } from "formik";

type Props =  {
  label: string
  description?: string
}

const FormCheckBoxField = (props: FieldHookConfig<boolean> & Props) => {
  const {label, description, name} = props
  const [field, meta, helpers] = useField(name);

  const { value } = meta;
  const { setValue } = helpers;

  return (
    <label className='form-check form-check-custom form-check-solid align-items-start mb-3'>
      <input
        className='form-check-input me-3'
        type='checkbox'
        value={1}
        checked={value}
        onChange={e => setValue(e.currentTarget.checked)}
      />
      <span className='form-check-label d-flex flex-column align-items-start'>
        <span className='fw-bold fs-5 mb-0'>{label}</span>
        <span className='text-muted fs-6'>{description}</span>
      </span>
    </label>
  )
};

export {FormCheckBoxField}