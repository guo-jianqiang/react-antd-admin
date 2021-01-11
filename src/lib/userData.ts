/** @format */

import {auth} from '../api/login'

export const CEC_USER_DATA = 'cec_vison_data'

export const getUserData = () => JSON.parse(window.localStorage.getItem(CEC_USER_DATA) || '{}')

export const setUserData = (data: any) => window.localStorage.setItem(CEC_USER_DATA, JSON.stringify(data))

export const removeUserData = () => window.localStorage.removeItem(CEC_USER_DATA)

export const getAuthInfo = async () => {
  const res = (await auth()).data
  if (res.code === 200) {
    setUserData({...getUserData(), ...res})
  }
  return res
}
