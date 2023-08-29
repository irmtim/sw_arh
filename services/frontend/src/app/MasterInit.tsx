import {useEffect, useRef} from 'react'
import {Tab} from 'bootstrap'
import {
    DrawerComponent,
    MenuComponent,
    ScrollComponent,
    ScrollTopComponent,
    StickyComponent,
    SwapperComponent,
    ToggleComponent,
} from '../_metronic/assets/ts/components'
import {ThemeModeComponent} from '../_metronic/assets/ts/layout'

import {useLayout} from '../shared/lib/core'

import { registerLocale, setDefaultLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
import { replaceDateTimeJSON } from 'shared'

export function MasterInit() {
  const {config} = useLayout()
  const isFirstRun = useRef(true)
  const pluginsInitialization = () => {
    isFirstRun.current = false
    ThemeModeComponent.init()
    setTimeout(() => {
      ToggleComponent.bootstrap()
      ScrollTopComponent.bootstrap()
      DrawerComponent.bootstrap()
      StickyComponent.bootstrap()
      MenuComponent.bootstrap()
      ScrollComponent.bootstrap()
      SwapperComponent.bootstrap()
      document.querySelectorAll('[data-bs-toggle="tab"]').forEach((tab) => {
        Tab.getOrCreateInstance(tab)
      })

      //date-picker
      registerLocale('ru', ru)
      setDefaultLocale('ru');
      replaceDateTimeJSON()
    }, 500)
  }

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      pluginsInitialization()
    }
  }, [config])

  return <></>
}
