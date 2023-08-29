import { FC, useState } from "react";

type Props = {
  // name: string
  // placeholder?: string
  
  // All other props
  [x:string]: any;
}

const PasswordField: FC<Props> = props => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  return (
    <>
      <input className="form-control" type={visible ? "text" : "password"} autoComplete="off" {...props}/>
      <span className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2" onClick={toggleVisibility}>
        <i className={`bi bi-eye-slash fs-2 ${visible && "d-none"}`}></i>
        <i className={`bi bi-eye fs-2 ${!visible && "d-none"}`}></i>
      </span>
    </>
  )
}

export {PasswordField};