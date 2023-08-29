import clsx from "clsx";
import { BootstrapColor } from "../forms";
import { KTIcon } from "../metronic";

type Props = {
  color: BootstrapColor
  iconName: string
  caption: string
  text: React.ReactNode
}

const Alert = ({color, caption, iconName, text}: Props) => {
  return (
    <div className={`alert alert-${color} d-flex align-items-center p-5 mb-10`}>
      <KTIcon iconName={iconName} className={clsx(`text-${color}`, 'fs-2hx me-3')}/>
      
      <div className="d-flex flex-column">
        <h5 className="mb-1">{caption}</h5>
        <span>{text}</span>
      </div>
    </div>
  );
};

export {Alert}