import clsx from 'clsx'
import {FC} from 'react'
import {Row} from 'react-table'

type Props = {
  row: Row<any>
  onClick?: (data: any) => void
}

const CustomRow: FC<Props> = ({row, onClick}) => (
  <tr {...row.getRowProps()} onClick={() => onClick && onClick(row.original)} role={onClick && 'button'}>
    {row.cells.map((cell) => {
      return (
        <td
          {...cell.getCellProps()}
          className={clsx({'text-end min-w-100px': cell.column.id === 'actions'})}
        >
          {cell.render('Cell')}
        </td>
      )
    })}
  </tr>
)

export {CustomRow}
