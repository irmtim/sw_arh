import { FC } from "react";
import { WithChildren } from "shared";

const FormCardFooter: FC<WithChildren> = ({children}) => {
  return (
    <div className='card-footer d-flex justify-content-start py-6 px-9'>
      {children}
    </div>
  );
};

export {FormCardFooter}