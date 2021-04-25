/** @format */

import React, {useRef, useEffect, useState} from 'react'
import {createPortal} from 'react-dom'

type PortalProps = {
  visible: boolean
  getContainer?: () => HTMLElement
}
const Portal: React.FC<PortalProps> = ({visible, getContainer = () => document.body, children}) => {
  const [openCount, setOpenCount] = useState(0)
  useEffect(() => {
    if (visible) {
      setOpenCount(openCount + 1)
    }
  }, [visible])
  return openCount ? createPortal(children, getContainer()) : null
}

export default Portal
