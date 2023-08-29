import {ReactNode} from 'react'
import {MenuComponent} from '../../_metronic/assets/ts/components'

type WithChildren = {
  children?: ReactNode
}

const reInitMenu = () => {
  setTimeout(() => {
    MenuComponent.reinitialization()
  }, 500)
}

export {type WithChildren, reInitMenu}
