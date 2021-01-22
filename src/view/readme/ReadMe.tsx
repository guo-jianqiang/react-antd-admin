/** @format */

import React, {useEffect, useState} from 'react'
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import md from '../../../README.md'

const renderers = {
  code: (props: {language: string; value: string}) => {
    return <SyntaxHighlighter language={props.language} children={props.value} />
  },
}

const ReadMe = () => {
  const [source, setSource] = useState('')
  useEffect(() => {
    fetch(md).then(async res => {
      const text = await res.text()
      setSource(text)
    })
  }, [])
  return (
    <ReactMarkdown
      renderers={renderers}
      children={source}
      transformImageUri={uri => (uri.startsWith('http') ? uri : `${uri}`)}
    />
  )
}

export default ReadMe
