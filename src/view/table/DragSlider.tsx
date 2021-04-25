/** @format */

import React, {useState, useCallback, useRef, useEffect} from 'react'
import useUpdate from '../../lib/useUpdate'
import './style.less'

let width = 200

const DragSlider: React.FC<{}> = () => {
  const [style, setStyle] = useState({
    width: 200,
  })
  const sliderRef = useRef<HTMLDivElement>(null)
  const clientX = useRef(0)
  const styleRef = useRef({
    width: 0,
  })
  const isDown = useRef(false)
  const onMouseDown = useCallback((e: MouseEvent) => {
    e.stopPropagation()
    isDown.current = true
    // 然后鼠标坐标是
    console.log(e.clientX)
    clientX.current = e.clientX
    document.body.addEventListener('mousemove', onMouseMove)
  }, [])
  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDown.current) return
    console.log(e.clientX)
    console.log(clientX.current)
    const offsetX = e.clientX - clientX.current
    // style.current.width = style.current.width + offsetX
    if (styleRef.current) {
      const width = styleRef.current.width
      styleRef.current.width = width + offsetX
      console.log(styleRef.current)
      setStyle({...styleRef.current})
    }
  }, [])

  const onMouseUp = useCallback((e: MouseEvent) => {
    isDown.current = false
    document.body.removeEventListener('mousemove', onMouseMove)
  }, [])
  console.log(style)

  useEffect(() => {
    sliderRef.current?.addEventListener('mousedown', onMouseDown)
    document.body.addEventListener('mouseup', onMouseUp)
    return () => {
      sliderRef.current?.removeEventListener('mousedown', onMouseDown)
      document.body.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  return (
    <div className="slider">
      <div className="slider-left" style={{width: style.width}}></div>
      <div className="slider-btn" ref={sliderRef}></div>
      <div className="slider-right"></div>
    </div>
  )
}

export default function Counter() {
  const [name, setName] = useState('james')
  if (name === 'james') {
    // eslint-disable-next-line
    const [other] = useState('other')
  }
  const [count, setCount] = useState(0)
  function updateData() {
    setName('kobe.r.i.p' + (count + 1))
    setCount(count + 1)
  }
  return (
    <div className="comp">
      <p>{name}</p>
      <p>{count}</p>
      <button onClick={() => updateData()}>点我+1</button>
    </div>
  )
}
