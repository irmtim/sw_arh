import { FC } from "react";
import { WithChildren } from "shared";

const FormCardBody: FC<WithChildren> = ({children}) => {
  return (
    <div className='card-body border-top p-9'>
      {children}
    </div>
  );
};

export {FormCardBody}