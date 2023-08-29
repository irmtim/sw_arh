import { Form, Formik, FormikProps, FormikValues } from "formik";
import { ReactNode } from "react";
import { Modal } from "react-bootstrap";
import { FormButtons, useToasts } from "shared";
import * as Yup from 'yup'

type Props<T extends FormikValues> = {
  header: string
  okButtonText?: string
  showModal: boolean
  data: T
  validationSchema?: Yup.ObjectSchema<any>
  successToast?: boolean
  hideCallBack: () => void
  submitCallBack: (data: T) => Promise<any>
  successCallBack: () => void
  children?(options: FormikProps<T>): ReactNode 
}

const FormModal: <T extends FormikValues>(p: Props<T>) => React.ReactElement<Props<T>> 
  = ({header, 
    okButtonText,
    showModal, 
    data, 
    validationSchema,
    successToast = true,
    children, 
    submitCallBack,
    successCallBack, 
    hideCallBack
  }) => 
{
  const toast = useToasts()

  const submit = (data: any) => {
    return submitCallBack(data)
      .then((result) => {
        if (result) {
          successCallBack() 
          hideCallBack()
          if (successToast) {
            toast.success({ text: `Успешная операция`})
          }
        }
      })
  }

  return (
    <Modal
      show={showModal}
      onHide={hideCallBack}
    >
    <Modal.Header className="align-items-baseline d-flex modal-header" closeButton>
        <Modal.Title>
          {header}
        </Modal.Title>
      </Modal.Header>   
      <Formik
        initialValues = {data}
        validationSchema = {validationSchema}
        onSubmit={submit}
      >
        {(helpers) => (
          <Form>
            <Modal.Body className="text-gray-600">
              {children && children(helpers)}
            </Modal.Body>
            <Modal.Footer>
              <FormButtons text={okButtonText} submitCallBack={helpers.submitForm} cancelCallBack={() => hideCallBack()} />
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export {FormModal}