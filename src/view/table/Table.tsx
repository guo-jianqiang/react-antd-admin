/** @format */

import React, {useEffect, useState} from 'react'
import {Table as AntdTable, Space, Tag, message} from 'antd'
import {useDidCache, useDidRecover} from 'react-router-cache-route'
import {ColumnType} from 'antd/lib/table/interface'
import CecIcon from '../../commpent/SvgIcon/SvgIcon'

CecIcon.setDefaultUrl('http://localhost:8089/icon/')

type recordProps = {
  name: string
  age: number
  address: string
  tags: Array<string>
}

const Table = () => {
  const [loading, setLoading] = useState(true)
  const columns: Array<ColumnType<recordProps>> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: Array<string>) => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green'
            if (tag === 'loser') {
              color = 'volcano'
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: recordProps) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ]

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ]
  useDidRecover(() => {
    message.success('进入缓存')
  })
  useEffect(() => {
    message.success('初始化')
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])
  return (
    <React.Fragment>
      <AntdTable columns={columns} dataSource={data} loading={loading} />
    </React.Fragment>
  )
}

export default Table
