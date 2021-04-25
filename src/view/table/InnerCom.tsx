/** @format */

import React, {useRef, useState, useCallback} from 'react'
import {PlayCircleOutlined} from '@ant-design/icons'
import './style.less'

const points = ['e', 'w', 's', 'n', 'ne', 'nw', 'se', 'sw']

type oriPosType = {
  top: number
  left: number
  cX: number
  cY: number
}

const InnerCom: React.FC<{}> = ({}) => {
  // 画板的
  const wrapRef = useRef<HTMLDivElement>(null)
  const direction = useRef()
  const [style, setStyle] = useState({
    left: 100,
    top: 100,
    width: 100,
    height: 100,
  })
  const [visible, setVisible] = useState(false)
  // 初始数据， 因为不需要重新render 所以用 useRef
  const oriPos = useRef<oriPosType>({
    top: 0, // 元素的坐标
    left: 0,
    cX: 0, // 鼠标的坐标
    cY: 0,
  })
  const isDown = useRef(false)
  const onMouseDown = useCallback(
    (dir, e) => {
      // 阻止事件冒泡
      e.stopPropagation()
      // 保存方向。
      direction.current = dir
      isDown.current = true
      // 然后鼠标坐标是
      const cY = e.clientY // clientX 相对于可视化区域
      const cX = e.clientX
      oriPos.current = {
        ...style,
        cX,
        cY,
      }
      setVisible(true)
    },
    [style],
  )

  /**
   * 元素变化。 方法放在组件外部或者其他地方。
   * @param direction  方向 // move 移动 / 'e', 'w', 's', 'n', 'ne', 'nw', 'se', 'sw'
   * @param oriStyle 元素的属性 width height top left
   * @param oriPos   鼠标按下时所记录的坐标
   * @param e        事件event
   */
  function transform(direction: any, oriPos: any, e: React.MouseEvent<HTMLDivElement>) {
    const style = {...oriPos.current}
    const offsetX = e.clientX - oriPos.current.cX
    const offsetY = e.clientY - oriPos.current.cY
    switch (direction.current) {
      // 拖拽移动
      case 'move':
        // 元素当前位置 + 偏移量
        const top = oriPos.current.top + offsetY
        const left = oriPos.current.left + offsetX
        // 限制必须在这个范围内移动 画板的高度-元素的高度
        if (wrapRef.current) {
          style.top = Math.max(0, Math.min(top, wrapRef.current?.clientHeight - style.height))
          style.left = Math.max(0, Math.min(left, wrapRef.current?.clientWidth - style.width))
        }
        break
      // 东
      case 'e':
        // 向右拖拽添加宽度
        style.width += offsetX
        return style
      // 西
      case 'w':
        // 增加宽度、位置同步左移
        style.width -= offsetX
        style.left += offsetX
        return style
      // 南
      case 's':
        style.height += offsetY
        return style
      // 北
      case 'n':
        style.height -= offsetY
        style.top += offsetY
        break
      // 东北
      case 'ne':
        style.height -= offsetY
        style.top += offsetY
        style.width += offsetX
        break
      // 西北
      case 'nw':
        style.height -= offsetY
        style.top += offsetY
        style.width -= offsetX
        style.left += offsetX
        break
      // 东南
      case 'se':
        style.height += offsetY
        style.width += offsetX
        break
      // 西南
      case 'sw':
        style.height += offsetY
        style.width -= offsetX
        style.left += offsetX
        break
    }
    return style
  }

  const onMouseMove = useCallback(e => {
    // 判断鼠标是否按住
    if (!isDown.current) return
    let newStyle = transform(direction, oriPos, e)
    setStyle(newStyle)
  }, [])
  const onMouseUp = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    isDown.current = false
  }, [])
  const onMouseLeave = useCallback(e => {
    isDown.current = false
  }, [])
  return (
    <div
      className="drawing-wrap"
      ref={wrapRef}
      onClick={e => {
        // if ()
      }}>
      <div
        className="drawing-box"
        style={{...style, border: visible ? '1px solid blue' : '1px solid transparent'}}
        onMouseDown={e => {
          onMouseDown('move', e)
        }}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}>
        {visible
          ? points.map((point, index) => (
              <div
                onMouseDown={e => {
                  onMouseDown(point, e)
                }}
                className={`control-point point-${point}`}
                key={point}
              />
            ))
          : null}
        <div style={{height: '100%', overflow: 'hidden'}}>
          分类电视剧风口浪尖索科洛夫就立刻睡觉了空间了 分类电视剧风口浪尖索科洛夫就立刻睡觉了空间了
          分类电视剧风口浪尖索科洛夫就立刻睡觉了空间了 分类电视剧风口浪尖索科洛夫就立刻睡觉了空间了
          分类电视剧风口浪尖索科洛夫就立刻睡觉了空间了分类电视剧风口浪尖索科洛夫就立刻睡觉了空间了分类电视剧风口浪尖索科洛夫就立刻睡觉了空间了
          分类电视剧风口浪尖索科洛夫就立刻睡觉了空间了 分类电视剧风口浪尖索科洛夫就立刻睡觉了空间了
          分类电视剧风口浪尖索科洛夫就立刻睡觉了空间了
        </div>
      </div>
    </div>
  )
}

export default React.memo(InnerCom, (_, props) => {
  return props.visible
})
