import clsx from "clsx";
import { FC } from "react";
import { WithChildren } from "shared";

type Props = {
  className?: string
}

const RCardHeader = ({children, className} : WithChildren & Props) => {
  return (
    <div className={clsx("align-items-center border-bottom d-flex h-60px h-lg-70px pb-0 pt-0 px-3 px-lg-9 justify-content-between mb-0", className)}>
      {children}
    </div>
  );
};

export {RCardHeader}