/** @format */

import React from 'react'
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'

const renderers = {
  code: (props: {language: string; value: string}) => {
    return <SyntaxHighlighter language={props.language} children={props.value} />
  },
}
const markdown =
  '# react-antd-admin\n' +
  '基于react+ts+antd构建的管理后台脚手架模版\n' +
  '## Layout(可单独拨离)\n' +
  '\n' +
  '1. Menu 响应式菜单\n' +
  '2. Header\n' +
  '3. Tabs 路由标签\n' +
  '4. Breadcrumb 面包屑\n' +
  '5. ConfigurationDrawer 系统设置，目前仅完成主题色配置项\n' +
  '\n' +
  '线上地址[ http://g_guojq.gitee.io/react-antd-admin]( http://g_guojq.gitee.io/react-antd-admin)\n' +
  '\n' +
  'git地址 [https://github.com/guo-jianqiang/react-antd-admin](https://github.com/guo-jianqiang/react-antd-admin)\n' +
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
  '```\n' +
  '## 环境配置\n' +
  '**env**目录下的三个文件(development production test).json分别对于开发、测试、生产环境配置参数。\n'

const ReadMe = () => {
  return <ReactMarkdown renderers={renderers} children={markdown} />
}

export default ReadMe
