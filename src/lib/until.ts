/** @format */

import { RouteItem } from '../route/routeItems'

/**
 * @description 判空
 * @param obj
 */
export const isEmpty = (obj: any) => {
  let isEmpty = false
  if (obj === undefined || obj === null || obj === '') {
    isEmpty = true
  } else if (Array.isArray(obj) && obj.length === 0) {
    isEmpty = true
  } else if (obj.constructor === Object && Object.keys(obj).length === 0) {
    isEmpty = true
  }
  return isEmpty
}

// 广度优先
export function treeForeach<T extends { routes?: Array<T> }>(tree: Array<T>, func: (node: T) => void) {
  let node
  const list = [...tree]
  while ((node = list.shift())) {
    func(node)
    node.routes && list.push(...node.routes)
  }
}
type nodeType = { [index: string]: any }
/**
 * 深度优先遍历，返回节点信息及深度
 * @param tree 
 * @param func 
 * @param childrenKey 
 */
export const treeDeepForeach = (
  tree: Array<any> | Object,
  func: (node: nodeType, deep: number) => void,
  childrenKey = 'children'
) => {
  let deep = 0
  const each = (node: nodeType) => {
    deep++
    func(node, deep)
    if (node[childrenKey] && node[childrenKey].length) {
      node[childrenKey].forEach((item: nodeType) => {
        each(item)
      })
    }
    deep--
  }
  if (Array.isArray(tree)) {
    tree.forEach(item => {
      each(item)
    })
  } else if (typeof tree === 'object') {
    each(tree)
  }
}
/**
 * @author guojianqiang
 * @description 查找匹配树节点并返回当前节点信息及深度
 * @param tree 
 * @param func 
 * @param childrenKey
 */
export const findTreeNode = (
  tree: Array<any> | Object,
  func: (node: nodeType) => boolean,
  childrenKey = 'children'
) => {
  let deep = 0
  const find: (node: nodeType) => any = (node) => {
    deep++
    if (func(node)) {
      return {...node, deep}
    }
    if (node[childrenKey] && node[childrenKey].length) {
      for (let item of node[childrenKey]) {
        const rnode = find(item)
        if (rnode) return {...rnode, deep}
      }
    }
    deep--
    return null
  }
  if (Array.isArray(tree)) {
    for (let item of tree) {
      const rnode = find(item)
      if (rnode) return rnode
    }
  } else if (typeof tree === 'object') {
    return find(tree)
  }
}

/**
 * @author gjq
 * @description 获取当前节点路径
 * @param nodes
 * @param handler
 * @param key
 */

export function getTreePath<T>(nodes: Array<T>, handler: (node: T) => {}, key = 'children') {
  nodes = !Array.isArray(nodes) ? [nodes] : [...nodes]
  const path: Array<T> = []
  const getPaths = (tree: Array<any>): any => {
    for (let i = 0; i < tree.length; i++) {
      const item = tree[i]
      path.push(item)
      if (handler(item)) {
        return path
      }
      if (item[key] && item[key].length) {
        const childrenPath = getPaths(item[key])
        if (childrenPath.length) return childrenPath
      }
      path.pop()
    }
    return []
  }
  return getPaths(nodes)
}

/**
 * 获取第一个非空路由
 * @param routes
 * @returns {*}
 */
export const getFirstRoute = (routes: Array<RouteItem>): RouteItem | any => {
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i]
    if (!route.routes) {
      return route
    }
    if (route.routes && route.routes.length) {
      return getFirstRoute(route.routes)
    }
  }
}

/**
 * 建立一个可存取到该file的url
 * @param file
 */
export const getObjectURL = (file: File) => {
  let url = null
  if (window.URL !== undefined) {
    // mozilla(firefox)
    url = window.URL.createObjectURL(file)
  } else if (window.webkitURL !== undefined) {
    // webkit or chrome
    url = window.webkitURL.createObjectURL(file)
  }
  return url
}

export const deepAssign: (to: { [key: string]: any }, from: { [key: string]: any }) => Object = (to, from) => {
  Object.keys(from).forEach(key => {
    const val = from[key]
    if (typeof val === 'object') {
      to[key] = Array.isArray(val) ? deepClone(val) : deepAssign({}, val)
    } else {
      to[key] = from[key]
    }
  })
  return to
}

export const deepClone: (obj: Object) => Object = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item))
  }
  if (typeof obj === 'object') {
    return deepAssign({}, obj)
  }
  return obj
}

export const getValue: (origin: { [key: string]: any }, path: string) => any = (origin, path) => {
  const reg = /\["?([0-9a-zA-Z_-]+)"?\]/g
  const pathArr: any[] = path.replace(reg, '.$1').split('.')
  let val = { ...origin }
  for (let i = 0; i < pathArr.length; i++) {
    const key = pathArr[i]
    if (!val) return val
    val = val[/\d+/.test(key) ? Number(key) : key]
  }
  return val
}
