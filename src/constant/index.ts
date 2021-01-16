/** @format */

export const LOGIN_PATH = '/login'

export const ACCOUNT_INFO = 'account_info'

export interface themeColorsInterface {
  id: number
  color: string
  name: string
}

export const themeColors: Array<themeColorsInterface> = [
  {
    id: 1,
    color: 'rgb(24, 144, 255)',
    name: '拂晓蓝(默认)',
  },
  {
    id: 2,
    color: 'rgb(245, 34, 45)',
    name: '薄暮',
  },
  {
    id: 3,
    color: 'rgb(250, 84, 28)',
    name: '火山',
  },
  {
    id: 4,
    color: 'rgb(19, 194, 194)',
    name: '明青',
  },
  {
    id: 5,
    color: 'rgb(82, 196, 26)',
    name: '激光绿',
  },
]
