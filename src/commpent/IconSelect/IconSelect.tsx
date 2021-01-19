/** @format */

import React, {useEffect, useState} from 'react'
import {Popover, Input, Row, Col} from 'antd'
import {InputProps} from 'antd/lib/input'
import './style.less'

enum sizeEnum {
  small = 24,
  middle = 32,
  large = 40,
}
interface SvgInterface {
  iconName: string
  iconSvg: string
}

export interface IconSelectProps extends InputProps {
  contentWidth?: number
  colNum?: number
  autoFetch?: boolean
  defaultValue?: string
  value?: string
  iconUrl: string
}

function IconSelect(props: IconSelectProps) {
  const {
    contentWidth = 240,
    colNum = 8,
    defaultValue,
    value: propsValue,
    autoFetch,
    iconUrl,
    onChange,
    ...otherProps
  } = props
  const [value, setValue] = useState(defaultValue)
  const [icons, setIcons] = useState<Array<SvgInterface>>([])
  useEffect(() => {
    if (autoFetch) {
      getIcon()
    }
  }, [])
  useEffect(() => {
    !defaultValue && setValue(propsValue)
  }, [propsValue])
  const getIcon = () => {
    fetch(iconUrl + 'icon.json').then(async res => {
      const myRes: any = await res.json()
      if (myRes.code === 0 && myRes.data && myRes.data.length) {
        const svgList: {[p: string]: PromiseSettledResult<any>} = await Promise.allSettled(
          myRes.data.map((name: string) => fetchSvg(iconUrl + name)),
        )
        const iconList = myRes.data.map((name: string, i: number) => ({
          iconName: name,
          // @ts-ignore
          iconSvg: svgList[i].status === 'fulfilled' ? svgList[i].value : '',
        }))
        setIcons(iconList || [])
      }
    })
  }
  const fetchSvg = async (url: string) => {
    const res = await fetch(url)
    return res.text()
  }
  const onVisibleChange = (visible: boolean) => {
    if (visible && !icons.length) getIcon()
  }
  const handleChangeIcon = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      onChange && onChange('' as any)
      setValue('')
    }
  }
  const handleClickIcon = (svg: SvgInterface) => () => {
    setValue(svg.iconName)
    onChange && onChange(svg.iconName as any)
  }
  const iconView = icons.find(i => i.iconName === value)
  const iconViewWidth = (otherProps.size && sizeEnum[otherProps.size]) || sizeEnum.middle
  const iconList = (
    <Row style={{width: contentWidth}} gutter={[8, 8]}>
      {icons.map(icon => (
        <Col
          onClick={handleClickIcon(icon)}
          key={icon.iconName}
          span={24 / colNum}
          className={`icon-select-input-item ${value === icon.iconName ? 'icon-select-active' : ''}`}>
          <span dangerouslySetInnerHTML={{__html: icon.iconSvg || ''}} />
        </Col>
      ))}
    </Row>
  )
  return (
    <div className={'icon-select'}>
      <div className={'icon-select-input'}>
        <Popover content={iconList} title="图标选择" onVisibleChange={onVisibleChange}>
          <Input value={propsValue ?? value} onChange={handleChangeIcon} allowClear {...otherProps} />
        </Popover>
      </div>
      {value?.includes('http') ? (
        <img
          style={{
            width: iconViewWidth,
          }}
          src={value}
          className={'icon-select-view'}
        />
      ) : (
        <div
          className={'icon-select-view'}
          style={{
            width: iconViewWidth,
          }}
          dangerouslySetInnerHTML={{__html: iconView?.iconSvg || ''}}
        />
      )}
    </div>
  )
}

export default IconSelect
