/** @format */

import axios, {AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse, AxiosPromise} from 'axios'
import {message} from 'antd'
import {Base64} from 'js-base64'
import myHistory from '../route/history'
import {getUserData, setUserData} from '../lib/userData'

message.config({
  maxCount: 1,
})
const baseURl = (process.env.APP_CONFIG as any)?.SERVER_URL
const instance: AxiosInstance = axios.create({
  baseURL: baseURl,
})

export const whiteList = ['/admin/login']

instance.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    if (config.params) {
      const params = {...config.params}
      Object.keys(params).map(key => {
        if (typeof params[key] === 'undefined' || params[key] === '' || params[key] === null) {
          delete params[key]
        }
      })
      config.params = params
    }
    const url = config.url || ''
    if (!whiteList.includes(url)) {
      const token = getUserData()?.token
      if (!token) {
        myHistory.push('/login')
        return config
      }
      config.headers.authorization = _encode(token)
    }
    return config
  },
  function (error: any) {
    // Do something with request error
    return Promise.reject(error)
  },
)
// interface extraResponse<T> extends AxiosResponse<T> {
//   code: number;
//   message: string;
// }
instance.interceptors.response.use(
  function (response) {
    // if (response.code !== 0 && response.message) {
    //   message.warn(response.message)
    // }
    if (response.config.url === baseURl + 'admin/login') {
      const token = response.data?.token
      if (!token) {
        myHistory.push('/login')
      }
      setUserData({token})
    }
    return response.data
  },
  error => {
    // Do something with response error
    const response = error.response
    if (response) {
      const msg = Array.isArray(response.data?.msg) ? response.data.msg.join('') : response.data?.msg
      message.error(msg)
      if (response.status === 403) {
        myHistory.push('/login')
      }
    }
    return Promise.reject(error)
  },
)

// 转码token
function _encode(token: string) {
  const base64 = Base64.encode(token + ':')
  return 'Basic ' + base64
}

export default instance
