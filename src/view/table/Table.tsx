/** @format */

import React, {useEffect, useState, ReactElement} from 'react'
import {createPortal} from 'react-dom'
import {Table as AntdTable, Space, Tag, message, Button} from 'antd'
import {useDidCache, useDidRecover} from 'react-router-cache-route'
import {ColumnType} from 'antd/lib/table/interface'
import CecIcon from '../../commpent/SvgIcon/SvgIcon'
import Test from './Test'
import { deepClone, getValue, treeDeepForeach, findTreeNode } from '../../lib/until'
import getPosition from '../../lib/getPosition'
import { filterTree, listToTree, treeToList } from '../../lib/tree'
import loginImg from '../../assets/images/login/login.png'

CecIcon.setDefaultUrl('http://localhost:8089/icon/')



const studentInfo = {
  name: '小明',
  age: 12,
  favoriteFoods: [
    'apple',
    'dumpling'
  ],
  habits: [
    { name: 'skating', 'zh-CN': '滑冰' },
  ],
  parents: {
    0: {
      relationShip: 'Dad',
      name: '小明他爸',
    },
    Mom: '小明他妈',
  }
}
console.log(getValue(studentInfo, 'name'));
console.log(getValue(studentInfo, 'favoriteFoods[0]'));
console.log(getValue(studentInfo, 'habits[0]["zh-CN"]'));
console.log(getValue(studentInfo, 'habits[1].name')); // undefined
console.log(getValue(studentInfo, 'parents.Mom'));
console.log(getValue(studentInfo, 'parents[0].name'));

type recordProps = {
  parentId: string | number;
  name: string
  age: number
  address: string
  tags: Array<string>
}

const Table = () => {
  const [loading, setLoading] = useState(true)
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
      children: [
        {
          name: 1,
          children: [
            {
              name: 3,
              arr: [1,2,3,4, {age: 3}]
            }
          ]
        }
      ]
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
  treeDeepForeach(data, (node, deep) => {
    console.log(node)
    console.log(deep)
  })
  console.log(listToTree(data))
  console.log(findTreeNode(data, node => node.name === 3))
  console.log(filterTree('2', node => node.name === 1))
  // console.log(treeToList(listToTree(data)))
  console.log(data)
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
  const handleClick = () => {
    setIsInsertDom(!isInsertDom)
  }
  return (
    <React.Fragment>
      {/* <AntdTable columns={columns} rowKey={'key'} dataSource={data} loading={loading} /> */}
      <Button onClick={handleClick}>切换</Button>
      {
        Array.from({length: 10}).map((item, i) => {
          if (isInsertDom && i === 1) {
            return <React.Fragment key={i}><div>123</div><Test num={i} key={i} /></React.Fragment>
          }
          return <Test num={i} key={i} />
        })
      }
      <div style={{height: 200, display: 'table-cell', verticalAlign: 'middle'}}>
        <img style={{height: 50}} src={loginImg} />
      </div>
    </React.Fragment>
  )
}

export default Table
