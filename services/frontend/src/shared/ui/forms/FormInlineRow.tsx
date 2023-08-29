import clsx from "clsx";
import { FC } from "react";

type Props = {
  label: string
  elementClassName?: string
  element: JSX.Element
}

const FormInlineRow: FC<Props> = ({label, elementClassName, element}) => (
  <div className="fs-6 d-flex justify-content-between mb-4">
    <div className="">{label}</div>
    <div className={clsx("d-flex fw-bold align-items-center", elementClassName)}>{element}</div>
  </div>
)

export {FormInlineRow}