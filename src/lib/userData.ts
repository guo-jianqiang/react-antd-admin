/** @format */

import {auth} from '../api/login'
import {getItem, removeItem, setItem} from './localStorage'

export const CEC_USER_DATA = 'cec_vison_data'

export interface UserInterface {
  username?: string
  token: string
}

export const getUserData = () => getItem(CEC_USER_DATA)

export const setUserData = (data: UserInterface) => setItem(CEC_USER_DATA, data)

export const removeUserData = () => removeItem(CEC_USER_DATA)

export const getAuthInfo = async () => {
  const res = (await auth()).data
  if (res.code === 200) {
    setUserData({...getUserData(), ...res})
  }
  return res
}
