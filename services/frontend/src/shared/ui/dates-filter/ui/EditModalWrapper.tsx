import { ReactNode, useState } from "react"
import { DateRange, FormButtons, IDatesDetailedFilterData } from "shared"
import { Modal } from "react-bootstrap"
import { DatesEditor } from "./DatesEditor"
import { DetailsEditor } from "./DetailsEditor"

type ChildrenProps = {
  edit: (data: IDatesDetailedFilterData) => void
}

type Props = {
  minMaxDates: DateRange
  showDetalization: boolean
  children?(props: ChildrenProps): ReactNode
  onSubmit: (query: IDatesDetailedFilterData) => void
}

const EditModalWrapper = ({minMaxDates, showDetalization, children, onSubmit}: Props) => {

  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState<IDatesDetailedFilterData>()

  const edit = (e: IDatesDetailedFilterData) => {
    setShowModal(true)
    setData(e)
  }

  const submit = async () => {
    if (!data) return

    onSubmit(data)
    setShowModal(false)
  }

  const hide = () => setShowModal(false)

  return (
    <>
      {children && children({edit: edit})}
      <Modal
        show={showModal}
        onHide={hide}
        >
        <Modal.Header className="align-items-baseline d-flex modal-header" closeButton>
          <Modal.Title>Настройка фильтрации</Modal.Title>
        </Modal.Header>
        {data && (
          <Modal.Body className="text-gray-600">
            <DatesEditor dates={data.dates} minMaxDates={minMaxDates} onChange={(dates) => setData({...data, dates: dates} as IDatesDetailedFilterData)}/>
            {showDetalization && (
              <>
                <div className="separator my-3 my-lg-6"></div>
                <DetailsEditor dates={data.dates} selected={data.detalization} onChange={(details) => setData({...data, detalization: details} as IDatesDetailedFilterData)}/>
              </>
            )}
          </Modal.Body>
        )}   
        <Modal.Footer>
          <FormButtons submitCallBack={() => submit()} cancelCallBack={hide} />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export {EditModalWrapper}