import { FC } from "react";
import { KTCard, WithChildren } from "shared";

const FormCard: FC<WithChildren> = ({children}) => {
  return (
    <KTCard className='mb-5 mb-xl-8'>
      {children}
    </KTCard>
  );
};

export {FormCard}