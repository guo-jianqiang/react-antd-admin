/** @format */

import http from './axios'
// 登录
export const login = (body: {email: string; password: string}) => {
  body = {
    email: body.email,
    password: body.password,
  }
  return http.post('/admin/login', body)
}
export const logout = () => {
  return http.post('/admin/logout')
}
// 获取用户信息
export const auth = () => {
  return http.get('/admin/auth')
}
