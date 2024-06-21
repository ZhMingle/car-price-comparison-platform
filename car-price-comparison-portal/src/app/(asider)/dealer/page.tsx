'use client'
export interface DealerItem {
  dealerId: string
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  email: string
  website: string
  status: 0
  createTime: string
  updateTime: string
}

import React, { useState, useEffect } from 'react'
import type { TableProps } from 'antd'
import { Button, Form, Input, InputNumber, Popconfirm, Space, Table, Typography } from 'antd'
import { filterDealer, getDealer } from '@/api'
import AddDealerModal from './AddDealer'

interface Item {
  key: string
  name: string
  age: number
  address: string
}

const originData: Item[] = []
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  })
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  title: any
  inputType: 'number' | 'text'
  record: Item
  index: number
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}>
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

const App: React.FC = () => {
  const [form] = Form.useForm()
  const [queryParams, setQueryParams] = useState({ name: '' })
  const [data, setData] = useState(originData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingKey, setEditingKey] = useState('')

  const isEditing = (record: Item) => record.key === editingKey

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record })
    setEditingKey(record.key)
  }

  const cancel = () => {
    setEditingKey('')
  }
  useEffect(() => {
    getDealer().then(res => {
      if (res.data.dealers) {
        setData(res.data.dealers.map(i => ({ ...(i as object), key: i.dealerId })) as any)
      }
    })
  }, [])
  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item
      setEditingKey('')
    } catch (errInfo) {
      console.error('Validate Failed:', errInfo)
    }
  }

  const columns = [
    {
      title: 'dealer id',
      dataIndex: 'dealerId',
      editable: true,
    },
    {
      title: 'name',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: 'address',
      dataIndex: 'address',
      editable: true,
    },
    {
      title: 'city',
      dataIndex: 'city',
      editable: true,
    },
    {
      title: 'state',
      dataIndex: 'state',
      editable: true,
    },
    {
      title: 'zipCode',
      dataIndex: 'zipCode',
      editable: true,
    },
    {
      title: 'country',
      dataIndex: 'country',
      editable: true,
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      editable: true,
    },
    {
      title: 'email',
      dataIndex: 'email',
      editable: true,
    },
    {
      title: 'website',
      dataIndex: 'website',
      render: (text: string) => (
        <a href={text} target="_blank">
          {text}
        </a>
      ),
      editable: true,
    },
    {
      title: 'status',
      dataIndex: 'status',
      editable: true,
    },
    {
      title: 'createTime',
      dataIndex: 'createTime',
      editable: true,
    },
    {
      title: 'updateTime',
      dataIndex: 'updateTime',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: Item) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        )
      },
    },
  ]

  const mergedColumns: TableProps['columns'] = columns.map(col => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })
  async function onSearch(id) {
    if (id) {
      const res = await filterDealer(id)
      res.data && setData([res.data].map(i => ({ ...(i as object), key: i.dealerId })) as any)
    }
  }
  return (
    <>
      <Space className="mb-10">
        <Input
          placeholder="dealer name"
          onChange={e => {
            setQueryParams({ ...queryParams, name: e.target.value })
          }}
        />
        <Input placeholder="dealer id" />
        <Button type="primary">Search</Button>
        <Button
          onClick={() => {
            setIsModalOpen(true)
          }}>
          Add a new dealer{' '}
        </Button>
      </Space>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
          scroll={{ x: 'max-content' }}
          size="small"
        />
      </Form>
      <AddDealerModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  )
}

export default App
