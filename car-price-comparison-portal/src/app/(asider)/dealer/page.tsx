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
import qs from 'qs'
import { delDealer, getDealer, updateDealer } from '@/api'
import AddDealerModal from './AddDealerModal'
import { ShowMessage } from '@/utility'
import { STATUS } from '@/const'
import { debounce } from 'lodash'

interface Item {
  key: string
  name: string
  age: number
  address: string
}

const originData: Item[] = []

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
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState<any>({
    current: 1,
    pageSize: 10,
  })
  const isEditing = (record: Item) => record.key === editingKey

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record })
    setEditingKey(record.key)
  }

  const cancel = () => {
    setEditingKey('')
  }
  useEffect(() => {
    getData()
  }, [pagination.current, pagination.pageSize])

  async function getData() {
    const query = qs.stringify({ pageNumber: pagination?.current, pageSize: pagination?.pageSize, ...queryParams })
    setLoading(true)
    const res = await getDealer(query)
    setLoading(false)
    if (Array.isArray(res.data.dealers)) {
      setData(res.data.dealers.map(i => ({ ...(i as object), key: i.dealerId })) as any)
      setPagination({
        ...pagination,
        total: res.data.total,
      })
    }
  }
  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item
      const res = await updateDealer({
        ...row,
        dealerId: key,
      } as any)
      if (res.status === 200) {
        ShowMessage.success('Update successfully!')
      }
      setEditingKey('')
      getData()
    } catch (errInfo) {
      console.error('Validate Failed:', errInfo)
    }
  }
  async function confirmDel(dealerId: string) {
    const res = await delDealer(dealerId)
    if (res.status === 200) {
      ShowMessage.success('delete successfully!')
      getData()
    }
  }
  const columns = [
    { title: 'dealer id', dataIndex: 'dealerId', editable: false },
    { title: 'name', dataIndex: 'name', editable: true },
    { title: 'address', dataIndex: 'address', editable: true },
    { title: 'city', dataIndex: 'city', editable: true },
    { title: 'state', dataIndex: 'state', editable: true },
    { title: 'zipCode', dataIndex: 'zipCode', editable: true },
    { title: 'country', dataIndex: 'country', editable: true },
    { title: 'phone', dataIndex: 'phone', editable: true },
    { title: 'email', dataIndex: 'email', editable: true },
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
    { title: 'status', dataIndex: 'status', render: (t: number) => <span>{STATUS[t]}</span> },
    { title: 'createTime', dataIndex: 'createTime', editable: false },
    { title: 'updateTime', dataIndex: 'updateTime', editable: false },
    {
      title: 'operation',
      dataIndex: 'operation',
      fixed: 'right',
      render: (_: any, record: Item) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <a onClick={cancel}>Cancel</a>
          </span>
        ) : (
          <Space>
            <Button disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Button>

            <Popconfirm
              title="Delete the user"
              description="Are you sure to delete this user?"
              onConfirm={() => confirmDel(record.key)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No">
              <Button danger>Delete</Button>
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  const mergedColumns = columns.map(col => {
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
  async function onSearch() {
    if (pagination.current === 1) {
      getData()
    } else {
      setPagination({
        ...pagination,
        current: 1,
      })
    }
  }
  function handleTableChange(_pagination: any) {
    setPagination(_pagination)
  }
  const enterTriger = debounce(function (e: any) {
    if (e.key === 'Enter') {
      onSearch()
    }
  }, 200)
  return (
    <>
      <Space className="mb-10">
        <Input
          placeholder="dealer name"
          allowClear
          onKeyDown={enterTriger}
          onChange={e => {
            setQueryParams({ ...queryParams, name: e.target.value })
          }}
        />
        <Button type="primary" loading={loading} onClick={onSearch}>
          Search
        </Button>
        <Button
          onClick={() => {
            setIsModalOpen(true)
          }}>
          Add dealer{' '}
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
          columns={mergedColumns as any}
          rowClassName="editable-row"
          pagination={{
            ...pagination,
            onChange: cancel,
            pageSizeOptions: [10, 20, 30, 50],
            showSizeChanger: true,
            showTotal: v => `Total ${v} item`,
          }}
          loading={loading}
          scroll={{ x: 'max-content' }}
          onChange={handleTableChange}
          size="small"
        />
      </Form>
      <AddDealerModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} $getData={getData} />
    </>
  )
}

export default App
