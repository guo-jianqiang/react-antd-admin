/** @format */

import React from 'react'
import {isEmpty} from '../../../lib/until'
import {getItem} from '../../../lib/localStorage'
import {SYStEM_CONFIG} from '../../../constant'
import {ActionInterface, PayloadInterface} from './configurationReducer'

export interface ConfigurationContextInterface {
  state: PayloadInterface
  dispatch: (action: ActionInterface) => void
}
const primaryColor = window.getComputedStyle(document.documentElement, null).getPropertyValue('--primary-color') || ''
export const getSystemConfig = () =>
  !isEmpty(getItem(SYStEM_CONFIG))
    ? getItem(SYStEM_CONFIG)
    : {
        primaryColor,
        collapsed: true,
      }
const ConfigurationContext = React.createContext<ConfigurationContextInterface>({
  state: getSystemConfig(),
  dispatch: action => {},
})

export default ConfigurationContext
