'use client'
import React, { useEffect, useState } from 'react'
import { Button, Space, Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd'
import type { TableProps } from 'antd'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import qs from 'qs'
import { delVehicle, getVehicle, updateVehicle } from '@/api'
import { ShowMessage } from '@/utility'
import { debounce } from 'lodash'
import { STATUS } from '@/const'

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
  const [pagination, setPagination] = useState<any>({
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
      render: (t: number) => <span>{STATUS[t]}</span>,
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
      render: (t: any) => (
        <PhotoProvider>
          <Space className="w-200">
            {t.split(',').map((item: string, index: string) => (
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
  const mergedColumns = columns.map(col => {
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
    const query = qs.stringify({ pageNumber: pagination?.current, pageSize: pagination?.pageSize, ...queryParams })
    setLoading(true)
    const res = await getVehicle(query)
    setLoading(false)
    if (Array.isArray(res.data.vehicles)) {
      setData(res.data.vehicles.map((i: any) => ({ ...(i as object), key: i.vehicleId })) as any)
      setPagination({
        ...pagination,
        total: res.data.total,
      })
    }
  }
  async function confirmDel(vehicleId: string) {
    const res = await delVehicle(vehicleId)
    if (res.status === 200) {
      ShowMessage.success('delete successfully!')
      getData()
    }
  }
  function handleTableChange(_pagination: any) {
    setPagination(_pagination)
  }
  const onSearch = debounce(function () {
    if (pagination.current === 1) {
      getData()
    } else {
      setPagination({
        ...pagination,
        current: 1,
      })
    }
  }, 300)
  const [queryParams, setQueryParams] = useState({ brand: '', model: '', year: '' })
  const enterTriger = debounce(function (e: any) {
    if (e.key === 'Enter') {
      onSearch()
    }
  }, 200)
  return (
    <>
      <Space className="mb-10">
        <Input
          placeholder="brand"
          allowClear
          onKeyDown={enterTriger}
          onChange={e => {
            setQueryParams({ ...queryParams, brand: e.target.value })
          }}
        />
        <Input
          placeholder="model"
          allowClear
          onKeyDown={enterTriger}
          onChange={e => {
            setQueryParams({ ...queryParams, model: e.target.value })
          }}
        />
        <Input
          placeholder="year"
          allowClear
          onKeyDown={enterTriger}
          onChange={e => {
            setQueryParams({ ...queryParams, year: e.target.value })
          }}
        />
        <Button type="primary" onClick={onSearch} loading={loading}>
          Search
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
    </>
  )
}

export default Vehicle
