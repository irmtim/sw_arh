import clsx from "clsx";
import { Card } from "react-bootstrap";
import { WithChildren } from "shared";

type Props = {
  className?: string
}

const RCardTitle = ({children, className} : WithChildren & Props) => {
  return (
    <Card.Title className={clsx("align-items-start d-flex flex-column mb-0", className)}>
      {children}
    </Card.Title>
  );
};

export {RCardTitle}