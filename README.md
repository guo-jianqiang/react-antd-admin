

# react-antd-admin

基于react+ts+antd构建的管理后台脚手架模版

### install npm packages
```shell
npm install
yarn install
```
### run
```shell
npm run dev
```
Project is running at http://localhost:8000/

### build
```shell
npm run build
```

### 约定式路由
```tsx
export interface RouteItem {
  path: string // 路径
  exact: boolean // 是否精准匹配
  meta: {
    tabFixed?: boolean // 是否固定tab项
    isCache?: boolean // 是否路由缓存
    name: string // 名字
    icon: Function | string // 图标
    hidden?: boolean // 是否隐藏菜单
  }
  component: ComponentType // 渲染组件
  routes?: Array<RouteItem> // 孩子路由
}
```

### 可缓存路由

配置只需在routeItems文件中配置参数即可，如下

```tsx
export interface RouteItem {
  path: string
  exact: boolean
  meta: {
    tabFixed?: boolean // 是否固定tab项
    ...
  }
  component: ComponentType
  routes?: Array<RouteItem>
}
```

### 支持清除路由缓存
**Tab支持右键contextmenu路由刷新**。Layout组件中传入缓存控制函数，更多信息请查看[react-router-cache-route](https://github.com/CJY0208/react-router-cache-route)

```tsx
export interface aliveControlInterface {
  dropByCacheKey: (cacheKey: string) => void  // 清除缓存，仅当前页面路由和清除缓存路由不同时可使用
  refreshByCacheKey: (cacheKey: string) => void // 刷新当前路由
  getCachingKeys: () => Array<string> // 或者缓存路由key列表
  clearCache: () => void // 清除所有缓存
}
```

### 支持tab拖拽
layout draggableTab 参数可用于控制是否拖拽

### 环境配置

使用[cross-env](https://github.com/kentcdodds/cross-env)设置环境变量，从而实现不同环境下的可配置化，配置获取来源为根目录下的env文件夹中获取(development.json、test.json、producation.json)

案例如下：

```json
// development.json 同其他文件
{
  "SERVER_URL": "www.baidu.com"
}
```



```json
"scripts": {
    "dev": "cross-env NODE_ENV=development webpack serve --config webpack/webpack.dev.ts",
    "test": "cross-env NODE_ENV=test webpack serve --config webpack/webpack.dev.ts",
    "build": "cross-env NODE_ENV=production webpack --config webpack/webpack.prod.ts"
  },

```

```json
plugins: [
    new webpack.DefinePlugin({
      "process.env.APP_CONFIG": JSON.stringify(envConfig)
    })
    ....
  ]
```

### 单独使用Layout
详情请查看[rainbow_deer/layout](https://guo-jianqiang.github.io/rainbow_deer/Components/ReactComponent/layout#/)
