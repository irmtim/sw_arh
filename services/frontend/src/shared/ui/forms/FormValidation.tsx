import { FC } from "react";

type Props = {
  touched?: any
  errors?: any
  showErrorAnyway?: boolean
}

const FormValidation: FC<Props> = ({touched, errors, showErrorAnyway = false}) => {
  return (
    <>
      {(touched || showErrorAnyway) && errors && (
        <div className='fv-plugins-message-container'>
          <div className='fv-help-block'>{errors}</div>
        </div>
      )}
    </>
  );
};

export {FormValidation}