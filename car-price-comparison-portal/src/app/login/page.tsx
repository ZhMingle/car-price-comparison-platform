'use client'
import { Button, Input, Space, Form, Select } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { login, register } from '@/api'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increament } from '@/store/modules/carStore'
import { RootState } from '@/store/index'
import { setToken } from '@/store/modules/userStore'
import { ShowMessage } from '@/utility'
import { debounce, pick } from 'lodash'
import { useRouter } from 'next/navigation'
export default function Login() {
  const formRef = useRef<any>(null)
  let [isLogin, setIsLogin] = useState(true)
  const { token } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const router = useRouter()
  const onFinish = debounce(
    async function (value: any) {
      if (isLogin) {
        const { data, status } = await login({ ...value })
        data?.token && dispatch(setToken(data.token))
        if (status === 200) {
          router.push('/vehicle')
        }
      } else {
        const res = await register(pick(value, ['username', 'password', 'email', 'mobile']))
        if (res.status === 200) {
          ShowMessage.success('Register successfully')
          setIsLogin(true)
        }
      }
    },
    1000,
    { leading: true },
  )
  function toggleLogin() {
    setIsLogin(!isLogin)
  }

  const { Option } = Select
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select className="w-72">
        <Option value="64">+64</Option>
        <Option value="61">+61</Option>
      </Select>
    </Form.Item>
  )
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-200">
      <div className="w-570 p-40 pr-60 bg-white rounded">
        <Form
          ref={formRef}
          name="normal_login"
          className="login-form w-full"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large">
          <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please input your Username!' }]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
          </Form.Item>
          {!isLogin && (
            <>
              <Form.Item
                name="password2"
                label="Confirm password"
                dependencies={['password']}
                rules={[
                  {
                    required: true,
                    message: 'Please reenter your Password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('The new password that you entered do not match!'))
                    },
                  }),
                ]}>
                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Confirm Password" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}>
                <Input />
              </Form.Item>
              <Form.Item name="mobile" label="Phone" rules={[{ required: true, message: 'Please input your phone number!' }]}>
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
              </Form.Item>
            </>
          )}
          <Form.Item wrapperCol={{ span: 24 }} colon={false}>
            <Button type="primary" htmlType="submit" className="mb-10" block>
              {isLogin ? 'Log in' : 'Register'}
            </Button>
            <Button type="text" block onClick={() => toggleLogin()}>
              {isLogin ? 'Register' : 'Log in'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
