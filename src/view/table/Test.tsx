import React, {useEffect, useState} from 'react'

interface TestProps {
  num: number,
  key: string | number;
}

interface TestState {
  info: Object
}

export default class Test extends React.Component<TestProps, TestState> {
  constructor (props: TestProps) {
    super(props)
    this.state = {
      info: {}
    }
  }
  componentDidMount () {
    console.log(this.props)
  }
  shouldComponentUpdate (nextProps: TestProps, nextState: TestState) {
    if (this.props.num !== nextProps.num) return true
    return false
  }
  componentDidUpdate () {
    console.log('update')
  }
  render () {
    return <div key={this.props.key}>{this.props.num}</div>
  }
}