'use client'
import React, { useEffect, useState } from 'react'
import { Form, Table, Button, Space, Input, InputNumber, Popconfirm, Typography } from 'antd'
import type { TableProps } from 'antd'
import qs from 'qs'
import { delUser, getUser, updateUser } from '@/api'
import AddUserModal from './AddUserModal'

export interface Item {
  key: string
  userId: string
  username: string
  password: string
  email: string
  mobile: string
  status: number
  createUserId: string
  createTime: string
  updateTime: string
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

const User: React.FC = () => {
  const [data, setData] = useState<Item[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 })
  const [form] = Form.useForm()
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
    getData()
  }, [pagination?.current, pagination?.pageSize])

  function getData() {
    const query = qs.stringify({ pageNumber: pagination.current, pageSize: pagination.pageSize })
    setLoading(true)
    getUser(query).then(res => {
      setLoading(false)
      if (Array.isArray(res.data?.users)) {
        setData(res.data.users.map(i => ({ ...(i as object), key: i.userId })) as any)

        setPagination({
          ...pagination,
          total: res.data.total,
        })
      }
    })
  }
  const showModal = () => {
    setIsModalOpen(true)
  }
  const save = async (key: string) => {
    try {
      const row = (await form.validateFields()) as Item
      // await updateUser({
      //   ...row,
      //   userId: key,
      // })
      setEditingKey('')
      getData()
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }
  async function confirmDel(userId: string) {
    await delUser(userId)
    getData()
  }
  const columns = [
    {
      title: 'id',
      dataIndex: 'userId',
      key: 'userId',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
      editable: true,
    },
    {
      title: 'mobile',
      dataIndex: 'mobile',
      key: 'mobile',
      editable: true,
    },
    {
      title: 'createTime',
      dataIndex: 'createTime',
      key: 'createTime',
      render: t => <span>{t.split('T').join(' ')}</span>,
    },
    {
      title: 'updateTime',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      key: '',
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
              title="Delete the task"
              description="Are you sure to delete this task?"
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
  const handleTableChange: TableProps['onChange'] = _pagination => {
    setPagination(_pagination as any)

    // `dataSource` is useless since `pageSize` changed
    if (_pagination.pageSize !== pagination?.pageSize) {
      setData([])
    }
  }
  return (
    <>
      <Space className="mb-10">
        <Input placeholder="username" />
        <Input placeholder="mobile" />
        <Input placeholder="dealer id" />
        <Button type="primary"> Search</Button>
        <Button onClick={showModal}>ADD USER</Button>
      </Space>
      {/* <Table style={{ marginTop: '20px' }} columns={columns} dataSource={data} /> */}
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
            ...pagination,
            onChange: cancel,
          }}
          loading={loading}
          onChange={handleTableChange}
          size="small"
        />
      </Form>
      <AddUserModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} $getData={getData} />
    </>
  )
}

export default User
