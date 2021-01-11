/** @format */

import React from 'react'
import {Row, Col, Form, Input, Button, Checkbox} from 'antd'
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import project from '../../../package.json'
import style from './style.m.less'
import LoginImg from '../../assets/images/login/login.png'
import Icon from '../../commpent/icon/Icon'

const layout = {
  // labelCol: { span: 6 },
  wrapperCol: {span: 24},
}

const Login = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className={style.login}>
      <div className={style['login-wrapper']}>
        <Row gutter={[0, 0]}>
          <Col span={12}>
            <div className={style['login-wrapper-img']}>
              <img src={LoginImg} />
            </div>
          </Col>
          <Col span={12}>
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
                  rules={[{required: true, message: 'Please input your password!'}]}>
                  <Input.Password
                    size="large"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="请输入密码"
                  />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{span: 24}}>
                  <Button size="large" block type="primary" htmlType="submit">
                    登录
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Login
