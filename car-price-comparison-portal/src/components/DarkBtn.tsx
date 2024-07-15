import { Switch } from 'antd'
import { SunOutlined, MoonOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { setIsDark } from '@/store/modules/carStore'
import { useDispatch } from 'react-redux'
const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDarkMode(systemPrefersDark)
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <Switch
      onChange={v => {
        dispatch(setIsDark(v))
      }}
      checkedChildren={<MoonOutlined />}
      unCheckedChildren={<SunOutlined />}
      defaultChecked
    />
  )
}

export default ThemeToggle
