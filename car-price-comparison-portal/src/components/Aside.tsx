'use client'
import { useState } from 'react'
import { UserOutlined, CarOutlined, UnorderedListOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Menu } from 'antd'
import { useRouter, usePathname } from 'next/navigation'
type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  { key: '/user', icon: <UserOutlined />, label: 'user management' },
  { key: '/vehicle', icon: <CarOutlined />, label: 'vehicle management' },
  { key: '/dealer', icon: <UnorderedListOutlined />, label: 'dealer management' },
]

export default function Aside() {
  const router = useRouter()
  const pathName = usePathname()

  const [collapsed, setCollapsed] = useState(false)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  function handleSelect(o: any) {
    router.push(o.key)
  }
  return (
    <div style={{ width: collapsed ? 'auto' : 240 }} className="bg-white py-10">
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16, marginLeft: 6 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={[pathName]}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
        onSelect={handleSelect}
      />
    </div>
  )
}
