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
    // 表示是否处于批量更新状态
    this._isBatchingUpdate = false

  }

  setState(partialState) {
    this._updateQueue.push(partialState)
    if (!this._isBatchingUpdate) {
      this.forceUpDate()
    }
  }

  forceUpDate() {

    this.state = this._updateQueue.reduce((accumulate, current) => {

      const nextState = typeof current == 'function' ? current(this.state) : current

      //覆盖原来的状态
      accumulate = { ...accumulate, ...nextState }

      return accumulate

    }, this.state)

    this._updateQueue.length = 0

    updateComponent(this)

  }

}





export default { createElement }