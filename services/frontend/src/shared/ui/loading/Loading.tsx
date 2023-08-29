import { FC, useEffect, useState } from "react";
import { WithChildren } from "shared";

type Props = {
  isLoaded: any
}

const Loading: FC<Props & WithChildren> = ({children, isLoaded}) => {
  const [transition, setTransition] = useState('')

  useEffect(() => {
    setTimeout(() => {
      setTransition('loading-dark')
    }, 500);
  })
  return (
    <>
      {children}
      {!isLoaded && 
        <div className={`loading-container ${transition}`}>
          <div>Загрузка данных...</div>
        </div>
        // <div className="spinner-border text-primary" role="status">
        //   <span className="visually-hidden">Загрузка...</span>
        // </div>
      }
    </>
  )

  // return isLoaded 
  //   ? <>{children}</>
  //   : <div className="spinner-border text-primary" role="status">
  //       <span className="visually-hidden">Загрузка...</span>
  //     </div>
};

export {Loading}