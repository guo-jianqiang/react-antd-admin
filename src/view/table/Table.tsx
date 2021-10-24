/** @format */

import React, {useEffect, useState} from 'react'
import {createPortal} from 'react-dom'
import {Table as AntdTable, Space, Tag, message} from 'antd'
import {useDidRecover} from 'react-router-cache-route'
import {ColumnType} from 'antd/lib/table/interface'
import getPosition from '../../lib/getPosition'

type recordProps = {
  parentId: string | number
  name: string
  age: number
  address: string
  tags: Array<string>
}

const Table = () => {
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const [isInsertDom, setIsInsertDom] = useState(false)
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
              <Tag color={color} key={tag} onClick={handleClickTag}>
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
      id: 4,
      parentId: 1,
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      id: 3,
      parentId: 1,
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      id: 1,
      parentId: 0,
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      id: 10,
      parentId: 3,
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
  const handleClickTag = (e: React.MouseEvent<HTMLElement>) => {
    const {x: left, y: top} = getPosition(e?.target as HTMLElement)
    const tooltip = <span style={{left, top, position: 'fixed'}}>hhhh</span>
    createPortal(tooltip, document.body)
  }
  return (
    <React.Fragment>
      <AntdTable columns={columns} rowKey={'key'} dataSource={data} loading={loading} />
    </React.Fragment>
  )
}

export default Table
