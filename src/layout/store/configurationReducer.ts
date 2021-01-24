/** @format */

import {CHANGE_PRIMARY_COLOR, COLLAPSE_MENU} from './actionTypes'
import {setItem} from '../../lib/localStorage'
import {SYSTEM_CONFIG} from '../../constant'
export interface PayloadInterface {
  primaryColor: string
  collapsed: boolean
}
export interface ActionInterface {
  type: string
  payload: PayloadInterface
}
export function configurationReducer(state: PayloadInterface, action: ActionInterface) {
  setItem(SYSTEM_CONFIG, action.payload)
  switch (action.type) {
    case COLLAPSE_MENU:
      return {...state, ...action.payload}
    case CHANGE_PRIMARY_COLOR:
      return {...state, ...action.payload}
    default:
      return {...state}
  }
}
