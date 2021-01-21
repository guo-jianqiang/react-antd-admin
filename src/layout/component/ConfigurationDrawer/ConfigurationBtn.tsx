/** @format */

import React, {FC, useCallback, useEffect, useRef, useState} from 'react'
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
  const onPanStartDown = (e: any) => {
    // e.stopPropagation()
    window.document.body.style.overflow = 'hidden'
    if (e.type === 'mousedown') {
      mouseMoveDiff.current = {top: e.clientY, right: e.clientX}
    }
    if (e.type === 'touchstart') {
      const [changedTouch] = e.changedTouches
      mouseMoveDiff.current = {top: changedTouch.clientY, right: changedTouch.clientX}
    }
    setIsMoving(true)
  }
  const onPanStartMove = (e: any) => {
    e.stopPropagation()
    const movingClient = (clientX: number, clientY: number) => {
      if (isMoving && btnRef.current) {
        const windowWidth = window.document.body.clientWidth
        const top = clientY
        let right = windowWidth - clientX - btnRef.current?.offsetWidth / 2
        if (right > windowWidth / 2) {
          right = visible ? drawerWidth : 0
          setIsMoving(false)
        }
        setPosition({top, right})
      }
    }
    if (e.type === 'mousemove') {
      movingClient(e.clientX, e.clientY)
    }
    if (e.type === 'touchmove') {
      const [changedTouch] = e.changedTouches
      movingClient(changedTouch.clientX, changedTouch.clientY)
    }
  }
  const onPanStartup = (e: any) => {
    e.stopPropagation()
    const setMouseDiff = (clientX: number, clientY: number) => {
      if (mouseMoveDiff.current) {
        mouseMoveDiff.current = {
          top: clientY - (mouseMoveDiff.current?.top as number),
          right: clientX - (mouseMoveDiff.current?.right as number),
        }
      }
    }
    window.document.body.style.overflow = 'auto'
    if (e.type === 'mouseup') {
      setMouseDiff(e.clientX, e.clientY)
    }
    if (e.type === 'touchend') {
      const [changedTouch] = e.changedTouches
      setMouseDiff(changedTouch.clientX, changedTouch.clientY)
    }
    setIsMoving(false)
  }
  const onPanStartMoveCallback = useCallback(onPanStartMove, [])
  const onPanStartupCallback = useCallback(onPanStartup, [])
  useEffect(() => {
    // console.log(position)
    window.addEventListener('mousemove', onPanStartMoveCallback)
    window.addEventListener('mouseup', onPanStartupCallback)
    return () => {
      window.removeEventListener('mousemove', onPanStartMoveCallback)
      window.removeEventListener('mouseup', onPanStartupCallback)
    }
  }, [position, isMoving])
  useEffect(() => {
    if (!isMoving) {
      setPosition({...position, right: visible ? drawerWidth : 0})
    }
  }, [isMoving, visible])
  const Btn = visible ? CloseOutlined : SettingOutlined
  return (
    <div
      ref={btnRef}
      className={'configuration-open'}
      style={{
        top: position.top,
        right: position.right,
        userSelect: isMoving ? 'none' : 'inherit',
        transition: isMoving ? 'none' : 'all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1)',
      }}
      onClick={handleClick}
      onMouseDown={onPanStartDown}
      onTouchStart={onPanStartDown}
      onTouchMove={onPanStartMove}
      onTouchEnd={onPanStartup}>
      <Btn style={{fontSize: 24, color: '#fff'}} />
    </div>
  )
}

export default ConfigurationBtn
