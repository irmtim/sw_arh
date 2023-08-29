import { FC } from "react";
import { WithChildren } from "shared/lib";

type Props = {
  data: any
}

const LoadingSpinner: FC<WithChildren & Props> = ({data, children}) => 
  data 
    ? <>{children}</>
    : (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Загрузка...</span>
      </div>
    );

export {LoadingSpinner}