import { updateComponent } from "./react-dom"


function createElement(type, config = {}, ...childrens) {

  return {
    type,
    props: {
      ...config,
      childrens
    }
  }

}

export class Component {

  static isComponent = true

  constructor(props) {
    this.props = props

    // 更新队列
    this._updateQueue = []

    //回调队列
    this._callbackQueue = []

    // 表示是否处于批量更新状态
    this._isBatchingUpdate = false

    this.refs = {}
  }

  setState(partialState, calback) {
    this._updateQueue.push(partialState)
    if (calback) {
      this._callbackQueue.push(calback)
    }
    if (!this._isBatchingUpdate) {
      this.forceUpDate()
    }
  }



  // 这个函数的作用是拿到最新的状态
  forceUpDate() {

    this.state = this._updateQueue.reduce((accumulate, current) => {

      const nextState = typeof current == 'function' ? current(this.state) : current

      //覆盖原来的状态
      accumulate = { ...accumulate, ...nextState }

      return accumulate

    }, this.state)

    this._updateQueue.length = 0

    // 这个函数的作用是更新最新的jsDom对象
    updateComponent(this)
    this._callbackQueue.forEach(item => item())
    this._callbackQueue.length = 0
  }

}

function createRef() {
  return { current: null }
}




export default { createElement, createRef }