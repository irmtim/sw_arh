import { FC, useEffect, useState } from "react"
import { Toast} from "react-bootstrap"
import { ToastItem } from "./_models";
import { KTIcon } from "shared";

type Props = {
  item: ToastItem
}

const TypiconToast: FC<Props> = ({item}) => {
  const [time, setTime] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    setTimeout(() => setTime(time + 1), 3000)
  }, [])

  useEffect(() => {
    if (time > 0) {
      setShow(false)
    }
  }, [time])

  return (
    <Toast bg={item.type} animation={true} show={show}  className={`p-3 fs-6 bg-opacity-100 text-light-${item.type} align-items-center`}>
      <Toast.Body>
        <div className="d-flex justify-content-between">
          <div>
            {/* {item.icon && (<KTSVG className='svg-icon svg-icon-3x svg-icon-light me-3' path={item.icon}/>)} */}
            {item.icon && (<KTIcon iconName={item.icon} className='svg-icon svg-icon-3x svg-icon-light me-3'/>)}
            {item.text}
          </div>
          <button type="button" className="btn-close btn-white" onClick={() => setShow(false)}></button>
        </div>
      </Toast.Body>
    </Toast>
  )
};

export default TypiconToast;