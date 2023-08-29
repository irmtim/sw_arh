import { ReactNode, useRef, useState } from "react";
import classes from './ModalMenu.module.css';
import useOnClickOutside from "../lib/useOnClickOutside";
import { ApperanceType } from "../api/models";
import clsx from "clsx";
import { KTIcon, RCard, RCardBody } from "shared";



type Props = {
  label: ReactNode
  form(options: {close: () => void}): ReactNode
  className?: string
  btnClassName?: string
  mobileAppearance?: ApperanceType
  mobileCloseButton?: boolean
}

const ModalMenu = ({label, form, className, btnClassName, mobileAppearance ='bottom', mobileCloseButton = false}: Props) => {
  const  [show, setShow] = useState(false)

  const ref = useRef(null)
  useOnClickOutside(ref, () => setShow(false))

  return (
    <div className={clsx(classes.container, className)}>
      <span 
        className={btnClassName}
        role="button" 
        onClick={() => setShow(true)}
      >
        {label}
      </span>
      {show && (
        <>
          <div className={classes.outside}/>
          <div ref={ref} className={clsx(classes.modal, mobileAppearance === 'top'? classes.mobileTop : classes.mobileBottom)}>
            {mobileCloseButton && 
              <span 
                role="button"
                className="d-flex justify-content-end mb-2" 
                onClick={() => setShow(false)}>
                <KTIcon iconName="cross-circle" className="fs-3hx text-primary"/>
              </span>}
            {/* <div className="fade modal-backdrop show"/> */}
            {form({
              close: () => setShow(false)
            })}
          </div>
        </>
      )}
    </div>
  );
};

export {ModalMenu}