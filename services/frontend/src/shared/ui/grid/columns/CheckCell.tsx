import { BootstrapColor } from "shared/ui/forms"
import { KTIcon } from "shared/ui/metronic"

type Props = {
  value: boolean
  color?: BootstrapColor
}

const CheckCell = ({ value, color="primary" } : Props) => {
  return (
    <>
      {value && <KTIcon iconName="check" className={`fs-1 text-${color}`} />}
    </>
  )
}

export { CheckCell }
