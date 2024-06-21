'use client'
import React, { useEffect, useState } from 'react'
import { Button, Space, Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd'
import type { TableProps } from 'antd'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import { delVehicle, getVehicle } from '@/api'

interface Item {
  key: string
  vehicleId: string
  brand: string
  model: string
  year: string
  mileage: string
  bodyType: string
  color: string
  currentPrice: string
  location: string
  dealerId: string
  listingDate: string
  status: string
  source: string
  scrapedDate: string
  listingUrl: string
  createUserId: string
  createTime: string
  updateTime: string
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

const images = ['https://cdn.motor1.com/images/mgl/MkO9NN/s1/future-supercars.webp']

const Vehicle: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState(originData)
  const [editingKey, setEditingKey] = useState('')

  const isEditing = (record: Item) => record.key === editingKey

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record })
    setEditingKey(record.key)
  }

  const cancel = () => {
    setEditingKey('')
  }

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item

      const newData = [...data]
      const index = newData.findIndex(item => key === item.key)
      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row,
        })
        setData(newData)
        setEditingKey('')
      } else {
        newData.push(row)
        setData(newData)
        setEditingKey('')
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const columns = [
    {
      title: 'vehicleId',
      dataIndex: 'vehicleId',
      editable: true,
      fixed: 'left',
    },
    {
      title: 'brand',
      dataIndex: 'brand',
      editable: true,
      fixed: 'left',
    },
    {
      title: 'model',
      dataIndex: 'model',
      editable: true,
    },
    {
      title: 'year',
      dataIndex: 'year',
      editable: true,
    },
    {
      title: 'mileage',
      dataIndex: 'mileage',
      editable: true,
    },
    {
      title: 'bodyType',
      dataIndex: 'bodyType',
      editable: true,
    },
    {
      title: 'color',
      dataIndex: 'color',
      editable: true,
    },
    {
      title: 'currentPrice',
      dataIndex: 'currentPrice',
      editable: true,
    },
    {
      title: 'location',
      dataIndex: 'location',
      editable: true,
    },
    {
      title: 'dealerId',
      dataIndex: 'dealerId',
      editable: true,
    },
    {
      title: 'listingDate',
      dataIndex: 'listingDate',
    },
    {
      title: 'status',
      dataIndex: 'status',
      editable: true,
    },
    {
      title: 'source',
      dataIndex: 'source',
      editable: true,
    },
    {
      title: 'scrapedDate',
      dataIndex: 'scrapedDate',
      editable: true,
    },
    {
      title: 'listingUrl',
      dataIndex: 'listingUrl',
      fixed: 'right',
      render: t => (
        <PhotoProvider>
          <Space className="w-200">
            {t.split(',').map((item, index) => (
              <PhotoView key={index} src={item}>
                <img src={item} alt="" className="cursor-pointer" />
              </PhotoView>
            ))}
          </Space>
        </PhotoProvider>
      ),
    },
    {
      title: 'createUserId',
      dataIndex: 'createUserId',
      editable: true,
    },
    {
      title: 'createTime',
      dataIndex: 'createTime',
    },
    {
      title: 'updateTime',
      dataIndex: 'updateTime',
    },
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
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
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
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })
  useEffect(() => {
    getData()
  }, [])
  async function getData() {
    const res = await getVehicle()
    if (Array.isArray(res.data.vehicles)) {
      setData(res.data.vehicles as any)
    }
  }
  function confirmDel(vehicleId) {
    delVehicle(vehicleId)
  }
  return (
    <>
      <Space className="mb-10">
        <Input placeholder="brand" />
        <Input placeholder="model" />
        <Input placeholder="year" />
        <Button type="primary"> Search</Button>
        <Button type="primary">Add Vehicle</Button>
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
    </>
  )
}

export default Vehicle
