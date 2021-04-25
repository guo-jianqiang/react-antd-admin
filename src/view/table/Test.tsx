/** @format */

import React, {useEffect, useState, useRef} from 'react'
import './style.less'

// interface TestProps {
//   visible: boolean;
//   onClose: () => void;
// }

class Control {
  state: any
}

interface TestProps extends Control {
  visible: boolean
  onClose: () => void
}

const Test: React.FC<TestProps> = ({visible, onClose}) => {
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dialogRef.current?.contains(e.target as HTMLDivElement)) {
      onClose?.()
    }
  }
  return (
    <div>
      <div className="dialog-root">
        <div className="dialog-wrap" style={{visibility: visible ? 'visible' : 'hidden'}} onClick={handleClick}>
          <div
            ref={dialogRef}
            className="dialog"
            style={{animationName: visible ? 'scale-in-center' : 'scale-out-center'}}>
            <div className="dialog-header"></div>
            modal
          </div>
        </div>
      </div>
    </div>
  )
}

export default Test
