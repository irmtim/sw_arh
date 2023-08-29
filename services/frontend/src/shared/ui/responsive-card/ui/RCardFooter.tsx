import clsx from "clsx";
import { FC } from "react";
import { WithChildren } from "shared";

type Props = {
  className?: string
}

const RCardFooter = ({children, className} : WithChildren & Props) => {
  return (
    <div className={clsx("card-footer d-flex pt-3 px-3 pt-lg-9 px-lg-9 pb-0", className)}>
      {children}
    </div>
  );
};

export {RCardFooter}