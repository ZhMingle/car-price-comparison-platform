// 'use client'
import { useState, useRef } from 'react'
import { Modal, Form, Input, Button, Col, Row } from 'antd'
import type { FormProps } from 'antd'
import { addDealer, addUser } from '@/api'
import { ShowMessage } from '@/utility'
import { DealerItem } from './page'

type FieldType = {
  username?: string
  password?: string
  email?: string
  mobile?: string
}

const AddDealerModal = function ({ isModalOpen, setIsModalOpen, $getData }: any) {
  const formRef = useRef<any>(null)
  const handleOk = () => {
    formRef.current?.submit()
  }

  const handleCancel = () => {
    formRef.current.resetFields()
    setIsModalOpen(false)
  }
  const onFinish: FormProps<FieldType>['onFinish'] = async values => {
    const res = await addDealer({
      ...values,
      status: 0, // default status: 0
    })

    if (res.status === 200) {
      ShowMessage.success('Add successfully')
    }
    setIsModalOpen(false)
    $getData()
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  function handleKeyDown(e: any) {
    // Enter
    if (e.keyCode === 13) {
      formRef.current?.submit()
    }
  }

  const Fields = [
    {
      name: 'name',
      required: true,
    },
    { name: 'address', required: true },
    { name: 'city', required: true },
    { name: 'state', required: true },
    { name: 'zipCode', required: true },
    { name: 'country', required: true },
    { name: 'phone', required: true },
    { name: 'email', required: true },
    { name: 'website', required: true },
    { name: 'status', required: true },
  ]
  return (
    <>
      <Modal title="Add Dealer" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          ref={formRef}
          name="basic"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onKeyDown={handleKeyDown}
          autoComplete="off">
          <Row gutter={24}>
            {Fields.map(i => {
              return (
                <Col span={12} key={i.name}>
                  <Form.Item<FieldType>
                    label={i.name}
                    name={i.name as any}
                    rules={[{ required: i.required, message: `Please input your ${i.name}!` }]}>
                    <Input />
                  </Form.Item>
                </Col>
              )
            })}
          </Row>
        </Form>
      </Modal>
    </>
  )
}

export default AddDealerModal
