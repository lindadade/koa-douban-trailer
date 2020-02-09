import React, { Component } from 'react'
import "babel-polyfill"

export default (loadComponent, placeholder = '正在加载中') => {
  return class AsyncComponent extends Component {
    unmount = false   // 卸载默认为false

    constructor () {
      super()
      this.state = {
        Child: null
      }
    }

    componentWillUnmount () {
      this.unmount = true
    }

    async componentDidMount () {  // 组件被安装时候
      const { default: Child } = await loadComponent()  // 把正在加载的组件设置别名为Child

      if (this.unmount) return
      this.setState({
        Child
      })
    }

    render () {
      const { Child } = this.state

      return (
        Child
        ? <Child {...this.props} />
        : placeholder
      )
    }
  }
}
