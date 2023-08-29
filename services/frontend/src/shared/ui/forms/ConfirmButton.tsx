import { FC } from "react";
import Swal, { SweetAlertOptions } from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {FormButton, FormButtonProps} from './FormButton'

type Props = FormButtonProps & {
  alertOptions: SweetAlertOptions

}

const ConfirmButton: FC<Props> = (props) => {
  const {alertOptions, onClick, ...rest} = props

  const swal = withReactContent(Swal)

  const click = () => {
    return swal.fire(alertOptions)
      .then((result) => {
        if (result.value) {
          return onClick()
        }
      })
  }

  return (
    <FormButton onClick={click} {...rest}/>
  );
};

export {ConfirmButton}