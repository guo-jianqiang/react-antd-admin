import React, {FC, useEffect, useRef, useState} from "react"
import './style.less'

const httpReg = /^https?/

interface SvgIconProps {
  style?: React.CSSProperties;
  className?: string;
  defaultUrl?: string;
  type: string;
}

interface CecIconStaticFun {
  setDefaultUrl: (url: string) => void
}

const CecIcon:FC<SvgIconProps> & CecIconStaticFun = props => {
  const { type, defaultUrl, className, style } = props
  const svgWrapperRef = useRef<HTMLDivElement | null>(null)
  const [icon, setIcon] = useState<string>()
  const isHttpImg = httpReg.test(type)
  useEffect(() => {
    if (!isHttpImg) {
      fetchSvg().then(res => {
        setIcon(res)
      })
    }
  }, [])
  const fetchSvg = async () => {
    const svgName = type + '.svg'
    const res = (await fetch(defaultUrl + svgName))
    return res.text()
  }
  const classNames = className ? 'cec-icon' + ` ${className}` : 'cec-icon'
  return isHttpImg ? <img src={type} style={style} className={className} /> :
    <span ref={svgWrapperRef} className={classNames} style={style} dangerouslySetInnerHTML={{ __html: icon || '' }} />
}

CecIcon.setDefaultUrl = (url) => {
  if (!CecIcon.defaultProps) CecIcon.defaultProps = {}
  CecIcon.defaultProps.defaultUrl = url
}

export default CecIcon
