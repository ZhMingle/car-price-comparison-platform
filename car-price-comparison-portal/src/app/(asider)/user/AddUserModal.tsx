// 'use client'
import { useState, useRef } from 'react'
import { Modal, Form, Input, Button } from 'antd'
import type { FormProps } from 'antd'
import { addUser } from '@/api'
import msg from '@/utility'

type FieldType = {
  username?: string
  password?: string
  email?: string
  mobile?: string
}

export default function ({ isModalOpen, setIsModalOpen, $getData }: any) {
  const formRef = useRef(null)
  const handleOk = () => {
    formRef.current?.submit()
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const onFinish: FormProps<FieldType>['onFinish'] = async values => {
    console.log(values)

    const res = await addUser({
      ...values,
      status: 0, // default status: 0
    })
    if (res.status === 200) {
      msg.success('Successfully addition')
    }
    setIsModalOpen(false)
    $getData()
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  function handleKeyDown(e) {
    // Enter
    if (e.keyCode === 13) {
      formRef.current?.submit()
    }
  }
  return (
    <>
      <Modal title="Add User" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          ref={formRef}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: false }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onKeyDown={handleKeyDown}
          autoComplete="off">
          <Form.Item<FieldType> label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType> label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input />
          </Form.Item>
          <Form.Item<FieldType> label="Mobile" name="mobile" rules={[{ required: true, message: 'Please input your mobile!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
