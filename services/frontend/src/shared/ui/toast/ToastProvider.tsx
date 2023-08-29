import { createContext, FC, useContext, useState } from "react";
import ToastContainer from "react-bootstrap/esm/ToastContainer";
import TypiconToast from "./TypiconToast";
import { initialToastContextValue, ToastContextProps, ToastItem, ToastProps } from "./_models";
import { WithChildren } from "shared";


const ToastContext = createContext<ToastContextProps>(initialToastContextValue)

export const TOAST_DELAY = 3000

export const ToastProvider: FC<WithChildren> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const add = (item: ToastItem) => {
    setToasts([...toasts, item])
  }

  const success = (toast: ToastProps) => {
    const newItem : ToastItem = {
      createDate: new Date(),
      type: "success",
      icon: "/media/icons/duotune/arrows/arr085.svg",
      ...toast
    }
    add(newItem)
  }

  const error = (toast: ToastProps) => {
    const newItem : ToastItem = {
      createDate: new Date(),
      type: "danger",
      ...toast
    }
    add(newItem)
  }

  const info = (toast: ToastProps) => {
    const newItem : ToastItem = {
      createDate: new Date(),
      type: "info",
      ...toast
    }
    add(newItem)
  }

  return (
    <ToastContext.Provider value={{ success, error, info }}>
      
      <ToastContainer 
        className='p-5'
        style={{
          zIndex: 2000,
          position: 'fixed',
          right: '0px',
          top: '0px'
        }}>
        {toasts.map((item, index) => (
          <TypiconToast key={index} item={item}/>
        ))}
      </ToastContainer>
      {children}
    </ToastContext.Provider>
  );
}

export const useToasts = () => useContext(ToastContext)