'use client'
import React, { useEffect, useState } from 'react'
import { Form, Table, Button, Space, Input, InputNumber, Popconfirm, Typography } from 'antd'
import type { GetProp, TableProps } from 'antd'
import { ShowMessage } from '@/utility'
import qs from 'qs'
import { delUser, getUser, updateUser } from '@/api'
import AddUserModal from './AddUserModal'
import { debounce } from 'lodash'
import { STATUS } from '@/const'

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
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>
interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1]
}
const User: React.FC = () => {
  const [data, setData] = useState<Item[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      pageSizeOptions: [10, 20, 30, 50],
      showSizeChanger: true,
    },
  })
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
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize])

  function getData() {
    const query = qs.stringify({ pageNumber: tableParams.pagination?.current, pageSize: tableParams.pagination?.pageSize, ...queryParams })
    setLoading(true)
    getUser(query).then(res => {
      setLoading(false)
      if (Array.isArray(res.data?.users)) {
        setData(res.data.users.map((i: any) => ({ ...(i as object), key: i.userId })) as any)

        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: res.data.total,
          },
        })
      }
    })
  }
  const showModal = () => {
    setIsModalOpen(true)
  }
  const save = async (key: string) => {
    const row = (await form.validateFields()) as Item
    const res = await updateUser({
      ...row,
      userId: key,
    })
    if (res.status === 200) {
      ShowMessage.success('Update successfully')
    }
    setEditingKey('')
    getData()
  }
  async function confirmDel(userId: string) {
    const res = await delUser(userId)
    if (res.status === 200) {
      ShowMessage.success('delete successfully!')
      getData()
    }
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
      render: (t: string) => <span>{t.split('T').join(' ')}</span>,
    },
    {
      title: 'updateTime',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
      render: (t: number) => <span>{STATUS[t]}</span>,
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

  const mergedColumns: TableProps['columns'] = columns.map(col => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })
  const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    })
    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([])
    }
  }
  const [queryParams, setQueryParams] = useState({ username: '', mobile: '' })
  function changeField(k: string, v: string) {
    setQueryParams({
      ...queryParams,
      [k]: v,
    })
  }

  function search() {
    if (tableParams.pagination?.current === 1) {
      getData()
    } else {
      setTableParams({
        pagination: {
          ...tableParams.pagination,
          current: 1,
        },
      })
    }
  }
  const enterTriger = debounce(function (e: any) {
    if (e.key === 'Enter') {
      search()
    }
  }, 200)
  return (
    <>
      <Space className="mb-10">
        <Input
          placeholder="username"
          onChange={e => {
            changeField('username', e.target.value)
          }}
          onKeyDown={enterTriger}
          allowClear
        />
        <Input
          placeholder="mobile"
          onChange={e => {
            changeField('mobile', e.target.value)
          }}
          allowClear
          onKeyDown={enterTriger}
        />
        <Button type="primary" loading={loading} onClick={search}>
          Search
        </Button>
        <Button onClick={showModal}>Add user</Button>
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
            ...tableParams.pagination,
            onChange: cancel,
            showTotal: v => `Total ${v} item`,
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
