/** @format */

import React, {useEffect, useState} from 'react'
import {Popover, Input, Row, Col, Tooltip} from 'antd'
import {InputProps} from 'antd/lib/input'
import './style.scss'

const {Search} = Input

const httpReg = /^https?/

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
  searchPlaceholder?: string
  defaultValue?: string
  value?: string
  iconUrl: string
}

function IconSelect(props: IconSelectProps) {
  const {
    contentWidth = 240,
    colNum = 8,
    searchPlaceholder = '查询图标',
    allowClear = true,
    defaultValue,
    value: propsValue,
    autoFetch,
    iconUrl,
    onChange,
    onBlur,
    style,
    className,
    ...otherProps
  } = props
  const [value, setValue] = useState(defaultValue)
  const [isBlur, setIsBlur] = useState(true)
  const [icons, setIcons] = useState<Array<SvgInterface>>([])
  const [keyword, setKeyword] = useState<string>()
  useEffect(() => {
    if (autoFetch) {
      getIcon()
    }
  }, [])
  useEffect(() => {
    !defaultValue && setValue(propsValue)
  }, [propsValue])
  const getIcon = () => {
    fetch(iconUrl).then(async res => {
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
  const getSvgName = (name: string) => {
    if (typeof name === 'undefined') return ''
    const nameArr = name.split('.')
    return nameArr.slice(0, nameArr.length - 1).join()
  }
  const onSearch = (v: string) => {
    setKeyword(v)
  }
  const onVisibleChange = (visible: boolean) => {
    if (visible && !icons.length) getIcon()
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsBlur(true)
    onBlur && onBlur(e)
  }
  const handleChangeIcon = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsBlur(false)
    setValue(e.target.value)
    onChange && onChange(e.target.value as any)
  }
  const handleClickIcon = (svg: SvgInterface) => () => {
    setValue(getSvgName(svg.iconName))
    onChange && onChange(getSvgName(svg.iconName) as any)
  }
  const iconView = icons.find(i => getSvgName(i.iconName) === value)
  const iconViewWidth = (otherProps.size && sizeEnum[otherProps.size]) || sizeEnum.middle
  const iconList = (
    <React.Fragment>
      <Search
        size={otherProps.size}
        placeholder={searchPlaceholder}
        onSearch={onSearch}
        allowClear
        style={{marginBottom: 8}}
      />
      <Row style={{width: contentWidth}} gutter={[8, 8]}>
        {(keyword ? icons.filter(icon => icon.iconName.includes(keyword)) : icons).map(icon => (
          <Tooltip title={getSvgName(icon.iconName)}>
            <Col
              onClick={handleClickIcon(icon)}
              key={icon.iconName}
              span={24 / colNum}
              className={`icon-select-input-item ${value === icon.iconName ? 'icon-select-active' : ''}`}>
              <span dangerouslySetInnerHTML={{__html: icon.iconSvg || ''}} />
            </Col>
          </Tooltip>
        ))}
      </Row>
    </React.Fragment>
  )
  return (
    <div className={'icon-select' + ` ${className}`} style={style}>
      <div className={'icon-select-input'}>
        <Popover content={iconList} title="图标选择" onVisibleChange={onVisibleChange}>
          <Input
            value={propsValue ?? value}
            onChange={handleChangeIcon}
            onBlur={handleBlur}
            allowClear
            {...otherProps}
          />
        </Popover>
      </div>
      <div
        className={'icon-select-view'}
        style={{
          width: iconViewWidth,
        }}>
        {value && httpReg.test(value) ? (
          isBlur && <img src={value} />
        ) : (
          <div dangerouslySetInnerHTML={{__html: iconView?.iconSvg || ''}} />
        )}
      </div>
    </div>
  )
}

export default IconSelect
