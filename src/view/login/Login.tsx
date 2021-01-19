/** @format */

import React, {FC, useContext} from 'react'
import {Row, Col, Form, Input, Button, Checkbox} from 'antd'
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import project from '../../../package.json'
import style from './style.m.less'
import LoginImg from '../../assets/images/login/login.png'
import Icon from '../../commpent/icon/Icon'
import {getItem, removeItem, setItem} from '../../lib/localStorage'
import {ACCOUNT_INFO} from '../../constant'
import {getFirstRoute} from '../../lib/until'
import history from '../../route/history'
import routeItems from '../../route/routeItems'
import userContext from '../../context/userContext'
import IconSelect from '../../commpent/IconSelect/IconSelect'

const layout = {
  // labelCol: { span: 6 },
  wrapperCol: {span: 24},
}

interface LoginProps {}

const Login: FC<LoginProps> = (props: {}) => {
  const context = useContext(userContext)
  const handleChange = (event: MouseEvent) => {
    console.log(event)
  }
  const onFinish = (values: any) => {
    console.log('Success:', values)
    const {username, password} = values
    if (values.remember) {
      setItem(ACCOUNT_INFO, {username})
    } else {
      removeItem(ACCOUNT_INFO)
    }
    context?.setUserData({username, token: '123'})
    const homePath = getFirstRoute(routeItems).path
    history.push(homePath)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  const {username, password} = getItem(ACCOUNT_INFO)
  return (
    <div className={style.login}>
      <div className={style['login-wrapper']}>
        <div className={style['login-wrapper-img']}>
          <img src={LoginImg} />
        </div>
        <div className={style['login-wrapper-form']}>
          <p className={style['login-wrapper-form-title']}>
            {project.name}
            <Icon type="iconweixiao" className={style['login-wrapper-form-title-icon']} />
          </p>
          <p className={style['login-wrapper-form-description']}>欢迎使用～</p>
          <Form
            {...layout}
            name="basic"
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
            <Form.Item
              // label="用户名"
              name="username"
              initialValue={username}
              rules={[{required: true, message: 'Please input your username!'}]}>
              <Input
                size="large"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入用户名"
              />
            </Form.Item>

            <Form.Item
              // label="密码"
              name="password"
              initialValue={password}
              rules={[{required: true, message: 'Please input your password!'}]}>
              <Input.Password
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="请输入密码"
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>记住密码</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{span: 24}}>
              <Button size="large" block type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login
