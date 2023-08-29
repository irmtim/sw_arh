import { ButtonHTMLAttributes, FC, useState } from "react";
import { Button } from "bootstrap";

type Props = {
  text?: string
  loadingText?: string
  submitCallBack: () => Promise<any>
  cancelCallBack?: () => void
}

const FormButtons: FC<ButtonHTMLAttributes<Button> & Props> = (props) => {
  const [loading, setLoading] = useState(false)
  
  const click = () => {
    setLoading(true)

    props.submitCallBack()
      .then(() => setLoading(false))
  } 

  return (
    <>
      <button 
        type={props.type ?? 'button'} 
        className={props.className ?? 'btn btn-primary me-2 flex-grow-1 flex-grow-1 flex-md-grow-0'} 
        disabled={loading}
        onClick={click}>
        {!loading && (props.text ?? 'Сохранить')}
        {loading && (
          <span className='indicator-progress' style={{display: 'block'}}>
            {props.loadingText ?? 'Подождите'}...{' '}
            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
          </span>
        )}
      </button>
      {props.cancelCallBack && (<span className='btn btn-light btn-active-light-primary ms-2 flex-grow-1 flex-md-grow-0' role={'button'} onClick={props.cancelCallBack}>Отменить</span> )}
    </>
  );
};

export {FormButtons}