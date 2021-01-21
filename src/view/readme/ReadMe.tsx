/** @format */

import React, {useEffect} from 'react'
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'

const renderers = {
  code: (props: {language: string; value: string}) => {
    return <SyntaxHighlighter language={props.language} children={props.value} />
  },
}
const markdown =
  '\n' +
  '\n' +
  '# react-antd-admin\n' +
  '\n' +
  '基于react+ts+antd构建的管理后台脚手架模版\n' +
  '\n' +
  '![](./static/images/system.png)\n' +
  '\n' +
  '线上地址[ http://g_guojq.gitee.io/react-antd-admin]( http://g_guojq.gitee.io/react-antd-admin)\n' +
  '\n' +
  'git地址 https://github.com/guo-jianqiang/react-antd-admin\n' +
  '\n' +
  '## 1.ConfigurationDrawer\n' +
  '\n' +
  '### 1-1.可缓存系统配置\n' +
  '\n' +
  '记录用户使用的系统配置，缓存浏览器中，记录用户习惯。目前可支持菜单展开收起状态和换肤\n' +
  '\n' +
  '### 1-2.antd换肤\n' +
  '![](./static/images/theme.gif)\n' +
  '\n' +
  '使用[antd-theme-webpack-plugin](https://github.com/mzohaibqc/antd-theme-webpack-plugin)插件实现导出antd样式文件并绑定cssVariable，通过less.js 浏览器在线编译改变less variable 方法实现主题样式变更\n' +
  '\n' +
  '```less\n' +
  '@import "_var";\n' +
  '\n' +
  ':root{\n' +
  '\t--primary-color: @primary-color;\n' +
  '\t--danger-color: red;\n' +
  '}\n' +
  '```\n' +
  '\n' +
  '\n' +
  '\n' +
  '```ts\n' +
  'window.less.modifyVars(vars).then(() => {\n' +
  '    if (vars[\'@primary-color\'] === getItem(SYStEM_CONFIG).primaryColor) return\n' +
  '    message.success(\'主题色切换成功\')\n' +
  '  })\n' +
  '  window.less.refreshStyles()\n' +
  '```\n' +
  '\n' +
  '\n' +
  '\n' +
  '\n' +
  '\n' +
  '## 2.Tab\n' +
  '\n' +
  '### 2-1.支持可缓存路由\n' +
  '\n' +
  '![](./static/images/routeCache.gif)\n' +
  '\n' +
  '配置只需在routeItems文件中配置参数即可，如下\n' +
  '\n' +
  '```tsx\n' +
  'export interface RouteItem {\n' +
  '  path: string\n' +
  '  exact: boolean\n' +
  '  meta: {\n' +
  '    tabFixed?: boolean // 是否固定tab项\n' +
  '    isCache?: boolean // 是否路由缓存\n' +
  '    name: string\n' +
  '    icon: Function | string\n' +
  '    hidden?: boolean // 是否隐藏菜单\n' +
  '  }\n' +
  '  component: ComponentType\n' +
  '  routes?: Array<RouteItem>\n' +
  '}\n' +
  '```\n' +
  '\n' +
  '### 2-2.支持清除路由缓存\n' +
  '\n' +
  'Layout组件中传入缓存控制函数，更多信息请查看[react-router-cache-route](https://github.com/CJY0208/react-router-cache-route)\n' +
  '\n' +
  '```tsx\n' +
  'export interface aliveControlInterface {\n' +
  '  dropByCacheKey: (cacheKey: string) => void  // 清除缓存，仅当前页面路由和清除缓存路由不显示时可使用\n' +
  '  refreshByCacheKey: (cacheKey: string) => void // 刷新当前路由\n' +
  '  getCachingKeys: () => Array<string> // 或者缓存路由key列表\n' +
  '  clearCache: () => void // 清除所有缓存\n' +
  '}\n' +
  '```\n' +
  '\n' +
  '## 环境配置\n' +
  '\n' +
  '使用[cross-env](https://github.com/kentcdodds/cross-env)设置环境变量，从而实现不同环境下的可配置化，配置获取来源为根目录下的env文件夹中获取(development.json、test.json、producation.json)\n' +
  '\n' +
  '案例如下：\n' +
  '\n' +
  '```json\n' +
  '// development.json 同其他文件\n' +
  '{\n' +
  '  "SERVER_URL": "www.baidu.com"\n' +
  '}\n' +
  '```\n' +
  '\n' +
  '\n' +
  '\n' +
  '```json\n' +
  '"scripts": {\n' +
  '    "dev": "cross-env NODE_ENV=development webpack serve --config webpack/webpack.dev.ts",\n' +
  '    "test": "cross-env NODE_ENV=test webpack serve --config webpack/webpack.dev.ts",\n' +
  '    "build": "cross-env NODE_ENV=production webpack --config webpack/webpack.prod.ts"\n' +
  '  },\n' +
  '\n' +
  '```\n' +
  '\n' +
  '```json\n' +
  'plugins: [\n' +
  '    new webpack.DefinePlugin({\n' +
  '      "process.env.APP_CONFIG": JSON.stringify(envConfig)\n' +
  '    })\n' +
  '    ....\n' +
  '  ]\n' +
  '```\n' +
  '\n' +
  '## 初始化\n' +
  '\n' +
  '```shell\n' +
  'yarn install\n' +
  'or\n' +
  'npm install\n' +
  '```\n' +
  '## 运行\n' +
  '```shell\n' +
  'npm run dev\n' +
  '```\n' +
  '[http://localhost:8000/](http://localhost:8000/)\n' +
  '\n' +
  '## 打包\n' +
  '```shell\n' +
  'npm run build\n' +
  '```'

const ReadMe = () => {
  useEffect(() => {
    console.log('cache')
  }, [])
  // (process.env.APP_CONFIG as any)?.SERVER_URL
  return <ReactMarkdown renderers={renderers} children={markdown} transformImageUri={uri =>
    uri.startsWith("http") ? uri : `${uri}`
  } />
}

export default ReadMe
