'use client'
import { Button, Input, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { login, register } from '@/api'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increament } from '@/store/modules/carStore'
import { RootState } from '@/store/index'
import { setToken } from '@/store/modules/userStore'
import { ShowMessage } from '@/utility'
import { debounce } from 'lodash'
export default function Login() {
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')
  let [isLogin, setIsLogin] = useState(true)
  const { token } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  async function handleLogin() {
    if (username.length === 0 || password.length === 0) {
      return
    }
    if (isLogin) {
      const { data } = await login({ username, password })
      console.log(typeof data, data)

      data?.token && dispatch(setToken(data.token))
    } else {
      register({ username, password })
    }
  }
  function toggleLogin() {
    setIsLogin(!isLogin)
  }
  const handleKeyDown = debounce((e: any) => {
    if (e.keyCode === 13) {
      handleLogin()
    }
  }, 1000)

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-200" onKeyDown={e => handleKeyDown(e)}>
      <div className="w-520 p-50 bg-slate-500/50 rounded flex flex-col justify-center items-center gap-20">
        <Input
          size="large"
          placeholder="username"
          prefix={<UserOutlined />}
          defaultValue={username}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(event.target.value)
          }}
        />
        <Input.Password
          size="large"
          placeholder="password"
          defaultValue={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value)
          }}
        />

        {!isLogin && (
          <Input.Password
            size="large"
            placeholder="reenter password"
            defaultValue={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value)
            }}
          />
        )}

        <Button type="primary" block onClick={() => handleLogin()}>
          {isLogin ? 'login' : 'sign-up'}
        </Button>
        <Button type="text" block onClick={() => toggleLogin()}>
          {isLogin ? 'sign-up' : 'login'}
        </Button>
      </div>
    </div>
  )
}
