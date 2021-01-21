/** @format */

import {CHANGE_PRIMARY_COLOR, COLLAPSE_MENU} from './actionTypes'
import {PayloadInterface} from './configurationReducer'

export const actionPrimaryColor = (payload: PayloadInterface, type: string = CHANGE_PRIMARY_COLOR) => {
  return {type, payload}
}

export const actionCollapsed = (payload: PayloadInterface, type: string = COLLAPSE_MENU) => {
  return {type, payload}
}
