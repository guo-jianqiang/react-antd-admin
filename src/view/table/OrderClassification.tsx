/** @format */

import React from 'react'

const col = 5

type TClassification = {classification: string; num: number}

const mockList = [
  {classification: '测试', num: 3},
  {classification: '测试', num: 3},
  {classification: '测试', num: 3},
  {classification: '测试', num: 3},
  {classification: '测试', num: 3},
  {classification: '测试', num: 3},
  {classification: '测试', num: 3},
  {classification: '测试', num: 3},
  {classification: '测试', num: 3},
  {classification: '测试', num: 3},
  {classification: '测试', num: 3},
  {classification: '测试', num: 3},
  {classification: '测试', num: 3},
  {classification: '测试', num: 3},
  {classification: '测试', num: 3},
  {classification: '测试', num: 3},
  {classification: '测试', num: 3},
  {classification: '测试', num: 3},
  {classification: '测试', num: 3},
  {classification: '测试', num: 3},
  {classification: '测试', num: 3},
]

function arrayToTwoArray<T>(list: T[], col: number): T[][] {
  const arr: T[][] = []
  for (let i = 0; i < list.length; i++) {
    const j = Math.floor(i / col)
    if (!arr[j]) arr[j] = []
    arr[j].push(list[i])
  }
  return arr
}

const OrderClassification: React.FC<{list: TClassification[]}> = props => {
  const {list = mockList} = props
  return (
    <div className={'classification'}>
      {list.map(item => (
        <div className={'classification-item'}>
          <div>{item.classification}</div>
          <div>{item.num}</div>
        </div>
      ))}
    </div>
  )
}

type User = {
  id: number
  kind: string
}

interface maskCustomerProps<T> extends User {}

function maskCustomer<T extends User>(u: T): Partial<T> {
  return {
    id: 1,
    kind: '12',
  }
}

export default OrderClassification
