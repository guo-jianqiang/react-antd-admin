/** @format */

import * as React from 'react'
import {createFromIconfontCN} from '@ant-design/icons'

declare var require: any

export interface IconProps {
  type: string
  title?: string
  // scriptUrl?: any;
  className?: string
  style?: React.CSSProperties
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
}

const Icon = createFromIconfontCN({
  scriptUrl: require('./iconfont.js'),
})
export default Icon
