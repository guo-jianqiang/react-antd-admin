/** @format */

import React, {FC, useEffect, useRef, useState} from 'react'
import cx from 'classnames'
import {CloseOutlined, SettingOutlined} from '@ant-design/icons'

interface ConfigurationBtnProps {
  visible: boolean
  drawerWidth: number
  handleClickBtn: (visible: boolean) => void
}

interface PositionInterface {
  top: number | string
  right: number | string
}

const ConfigurationBtn: FC<ConfigurationBtnProps> = ({visible, drawerWidth, handleClickBtn}) => {
  const mouseMoveDiff = useRef<PositionInterface | null>()
  const btnRef = useRef<HTMLDivElement | null>(null)
  const [position, setPosition] = useState<PositionInterface>({top: '50%', right: 0})
  const [isMoving, setIsMoving] = useState(false)
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (mouseMoveDiff.current?.right === 0 && mouseMoveDiff.current?.top === 0) handleClickBtn(!visible)
  }
  const onMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    mouseMoveDiff.current = {top: e.clientY, right: e.clientX}
    setIsMoving(true)
  }
  const onMouseMove = (e: MouseEvent) => {
    if (isMoving && btnRef.current) {
      const windowWidth = window.document.body.clientWidth
      const top = e.clientY
      let right = windowWidth - e.clientX - btnRef.current?.offsetWidth / 2
      right = right > windowWidth / 2 ? windowWidth / 2 : right
      setPosition({top, right})
    }
  }
  const onMouseup = (e: MouseEvent) => {
    if (mouseMoveDiff.current) {
      mouseMoveDiff.current = {
        top: e.clientY - (mouseMoveDiff.current?.top as number),
        right: e.clientX - (mouseMoveDiff.current?.right as number),
      }
    }
    setIsMoving(false)
  }
  useEffect(() => {
    if (!isMoving) {
      setPosition({...position, right: visible ? drawerWidth : 0})
    }
  }, [isMoving, visible])
  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseup)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseup)
    }
  })
  const Btn = visible ? CloseOutlined : SettingOutlined
  return (
    <div
      ref={btnRef}
      className={cx('configuration-open')}
      style={{
        top: position.top,
        right: position.right,
        userSelect: isMoving ? 'none' : 'inherit',
        transition: isMoving ? 'none' : 'all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1)',
      }}
      onClick={handleClick}
      onMouseDown={onMouseDown}>
      <Btn style={{fontSize: 24, color: '#fff'}} />
    </div>
  )
}

export default ConfigurationBtn
