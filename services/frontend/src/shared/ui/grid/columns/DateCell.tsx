import moment from 'moment'
import {FC} from 'react'

type Props = {
  date: Date
  className?: string
  dateFormat?: string
}

const DateCell: FC<Props> = ({ date, className, dateFormat = 'DD/MM/YYYY' }) => (
  <div className={className}>{date && moment(date).format(dateFormat)}</div>
)

export { DateCell }
