import { ButtonHTMLAttributes, FC, useState } from "react";
import { KTIcon } from "../metronic";
import clsx from "clsx";
import { BootstrapColor, BootstrapSize } from "./api";

export type FormButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: string
  color?: BootstrapColor
  size?: BootstrapSize
  text?: string
  loadingText?: string
  onClick: () => Promise<any>
}

const FormButton: FC<FormButtonProps> = (props) => {
  const {className, color, size, icon, loadingText, text, onClick, ...restProps} = props
  const [loading, setLoading] = useState(false)
  
  const click = () => {
    setLoading(true)

    onClick()
      .finally(() => setLoading(false))
  } 
  
  return (
    <button 
      className={clsx(className
        , color && `btn-${color}`
        , size && `btn-${size}`)} 
      disabled={loading}
      onClick={click}
      {...restProps} 
      >
        {!loading && icon && <KTIcon iconName={icon} className={clsx("fs-1 me-2", color && `text-${color}`)}/>}
        {loading && (
          <span className='indicator-progress' style={{display: 'block'}}>
            {icon && <span className='spinner-border spinner-border-sm align-middle me-2'></span>}
            {loadingText ?? 'Подождите'}...{' '}
            {!icon && <span className='spinner-border spinner-border-sm align-middle me-2'></span>}
          </span>
        )}
        {!loading && (text ?? 'Сохранить')}
      </button>
  );
};

export {FormButton}