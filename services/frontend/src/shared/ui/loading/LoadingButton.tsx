import { Button } from "bootstrap";
import { ButtonHTMLAttributes, FC, useState } from "react";

type Props = {
  text?: string
  loadingText?: string
  clickCallBack: () => Promise<any>
}

const LoadingButton: FC<ButtonHTMLAttributes<Button> & Props> = (props) => {
  const [loading, setLoading] = useState(false)
  
  const click = () => {
    setLoading(true)

    props.clickCallBack()
      .finally(() => setLoading(false))
  } 

  return (
    <button 
      type={props.type ?? 'button'} 
      className={props.className ?? 'btn btn-primary me-2'} 
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
  );
};

export {LoadingButton}