import clsx from "clsx";
import { ButtonHTMLAttributes, FC, useState } from "react";
import { BootstrapColor, BootstrapSize, KTIcon } from "shared";

type Props = ButtonHTMLAttributes<HTMLSpanElement> & {
  icon?: string
  color?: BootstrapColor
  size?: BootstrapSize
  text?: string
  loadingText?: string
  onClick: () => Promise<any>
}

const FormLink: FC<Props> = (props) => {
  const {className, color, size, icon, loadingText, text, onClick, role='button', ...restProps} = props
  const [loading, setLoading] = useState(false)
  
  const click = () => {
    setLoading(true)

    onClick()
      .finally(() => setLoading(false))
  } 

  return (
    <span 
      role={role}
      className={clsx(className
        , color && `btn-${color}`
        , size && `btn-${size}`)} 
      disabled={loading}
      onClick={click}
      {...restProps} 
      >
        {!loading && icon && <KTIcon iconName={icon} className={clsx("fs-1 h-20px me-2", color && `text-${color}`)}/>}
        {loading && (
          <span className='indicator-progress' style={{display: 'block'}}>
            {icon && <span className='spinner-border spinner-border-sm align-middle me-2'></span>}
            {loadingText ?? 'Подождите'}...{' '}
            {!icon && <span className='spinner-border spinner-border-sm align-middle me-2'></span>}
          </span>
        )}
        {!loading && (text ?? 'Сохранить')}
      </span>
  );
};

export {FormLink}