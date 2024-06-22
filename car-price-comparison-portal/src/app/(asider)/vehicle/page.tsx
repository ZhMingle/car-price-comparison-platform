'use client'
import React, { useEffect, useState } from 'react'
import { Button, Space, Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd'
import type { TableProps } from 'antd'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import qs from 'qs'
import { delVehicle, getVehicle, updateVehicle } from '@/api'
import AddVehicleModal from './AddVehicleModal'
import { ShowMessage } from '@/utility'

export interface VehicleItem {
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

const originData: VehicleItem[] = []

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  title: any
  inputType: 'number' | 'text'
  record: VehicleItem
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

const Vehicle: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState(originData)
  const [editingKey, setEditingKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })
  const isEditing = (record: VehicleItem) => record.key === editingKey

  const edit = (record: Partial<VehicleItem> & { key: React.Key }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record })
    setEditingKey(record.key)
  }

  const cancel = () => {
    setEditingKey('')
  }

  const save = async (key: string) => {
    try {
      const row = (await form.validateFields()) as VehicleItem
      const res = await updateVehicle({
        ...row,
        vehicleId: key,
      })
      if (res.status === 200) {
        ShowMessage.success('edit successfully')
      }
      setEditingKey('')
      getData()
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const columns = [
    {
      title: 'vehicleId',
      dataIndex: 'vehicleId',
      editable: false,
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
      render: (_: any, record: VehicleItem) => {
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
      onCell: (record: VehicleItem) => ({
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
  }, [pagination.current, pagination.pageSize])
  async function getData() {
    const query = qs.stringify({ pageNumber: pagination?.current, pageSize: pagination?.pageSize })
    setLoading(true)
    const res = await getVehicle(query)
    setLoading(false)
    if (Array.isArray(res.data.vehicles)) {
      setData(res.data.vehicles.map(i => ({ ...(i as object), key: i.vehicleId })) as any)
      setPagination({
        ...pagination,
        total: res.data.total,
      })
    }
  }
  async function confirmDel(vehicleId: sring) {
    const res = await delVehicle(vehicleId)
    if (res.status === 200) {
      ShowMessage.success('delete successfully!')
      getData()
    }
  }
  function handleTableChange(_pagination: any) {
    setPagination(_pagination)
  }
  return (
    <>
      <Space className="mb-10">
        <Input placeholder="brand" />
        <Input placeholder="model" />
        <Input placeholder="year" />
        <Button type="primary"> Search</Button>
        <Button
          onClick={() => {
            setIsModalOpen(true)
          }}>
          Add Vehicle
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
      <AddVehicleModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  )
}

export default Vehicle
