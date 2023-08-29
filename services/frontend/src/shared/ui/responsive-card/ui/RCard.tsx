import clsx from "clsx";
import { FC } from "react";
import { WithChildren } from "shared";

type Props = {
  className?: string
}

const RCard: FC<WithChildren & Props> = ({children, className}) => {
  return (
    <div className={clsx("card pb-3 pb-lg-9", className)}>
      {children}
    </div>
  );
};

export {RCard}