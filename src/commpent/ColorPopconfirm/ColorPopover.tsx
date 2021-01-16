/** @format */

import React, {FC, useEffect, useRef, useState} from 'react'
import ReactDom from 'react-dom'
import cx from 'classnames'
import {ColorResult, SketchPicker} from 'react-color'
import './style.less'
import getPosition from '../../lib/getPosition'

interface ColorPopoverProps {
  color?: string
  initialColor?: string
  onChange: (color: string) => void
}
const ColorPopover: FC<ColorPopoverProps> = props => {
  const {initialColor, onChange} = props
  const colorRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [color, setColor] = useState<string | undefined>(initialColor)
  const [position, setPosition] = useState<{x: number; y: number}>({x: 0, y: 0})
  const handleClickModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!colorRef.current?.contains(e?.target as Node)) {
      setVisible(false)
    }
  }
  useEffect(() => {
    if (props.color) {
      setColor(props.color)
    }
  }, [props.color])
  const handleChangeColor = (color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()
    setColor(color.hex)
    onChange(color.hex)
  }
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const position = getPosition(e.target as HTMLElement)
    setPosition(position)
    setVisible(true)
  }
  return (
    <React.Fragment>
      <div className={'color'} onClick={handleClick}>
        <div className={'color-wrapper'} style={{background: color}} />
      </div>
      {visible &&
        ReactDom.createPortal(
          <div onClick={handleClickModal} className={'color-modal'}>
            <div
              ref={colorRef}
              className={cx('color-modal-selector', {
                'color-modal-hidden': !visible,
              })}
              style={{
                left: position.x,
                top: position.y,
              }}>
              <SketchPicker color={color} onChangeComplete={handleChangeColor} />
            </div>
          </div>,
          window.document.body,
        )}
    </React.Fragment>
  )
}

export default ColorPopover
