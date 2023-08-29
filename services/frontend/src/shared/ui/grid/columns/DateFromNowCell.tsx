import moment from 'moment'
import {FC} from 'react'

type Props = {
  date: Date
  className?: string
}

const DateFromNowCell: FC<Props> = ({ date, className }) => (
  <div className={className}>{date && moment(date).fromNow()}</div>
)

export { DateFromNowCell }
