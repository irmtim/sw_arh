import { FC } from "react";
import * as Yup from 'yup'
import { FormModal } from "./FormModal";
import { FormRow, FormValidation } from "shared";
import { Field } from "formik";

type Props = {
  header: string
  label?: string
  placeHolder?: string
  showModal: boolean
  data: string
  hideCallBack: () => void
  submitCallBack: (data: string) => Promise<any>
  successCallBack: () => void
}

const validationSchema = Yup.object().shape({
  data: Yup.string().required('Обязательно для заполнения'),
})

type ObjData = {
  data: string
}

const FormModalString: FC<Props> = (props) => {
  const {data, 
    submitCallBack,
    label = "Имена",
    placeHolder = "Укажите имена",
    ...rest} = props

  const objData: ObjData = { data: data }

  const submit = (d: ObjData) => submitCallBack(d.data)

  return (
    <FormModal 
      data={objData} 
      validationSchema={validationSchema}
      submitCallBack={submit}
      {...rest}>
      {({errors, touched}) => (
        <>
          <FormRow
            label={label}
            editor={(
              <>
                <Field className='form-control' name="data" placeholder={placeHolder} component='textarea' rows='5' autoFocus/>
                <FormValidation touched={touched.data} errors={errors.data}/>
              </> 
            )}
            required
          />
        </>
      )}
    </FormModal>
  );
};

export {FormModalString}