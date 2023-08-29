import clsx from "clsx";
import { FC, ReactNode } from "react";

type Props = {
  label?: string
  required?: boolean
  editor?: ReactNode
  className?: string
  customLabelCss?: string
}

const FormRow: FC<Props> = ({label, required = false, editor, className = 'mb-6', customLabelCss = 'd-block fw-bold fs-6 mb-3'}) => {
  return (
    <div className={clsx('fv-row', className)}>
      {label && <label className={clsx(customLabelCss, required ? 'required' : '')}>{label}</label>}
      {editor}
    </div>
  );
};

export {FormRow}