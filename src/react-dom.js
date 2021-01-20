
export function updateComponent(componentInstance) {
  //拿出js描述的dom
  const element = componentInstance.render()

  let { type, props } = element

  //创建真实dom
  let dom = createDom(type, props, componentInstance)

  //更换渲染之前真实dom
  componentInstance.dom.parentNode.replaceChild(dom, componentInstance.dom)

  //替换之前真实dom
  componentInstance.dom = dom

}

/* 
合成事件
在事件处理函数执行前要把批量更新模式设置为true,使更新js的dom加入到了任务队列
等事件函数处理完成之后才会进行实际更新
事件委托把所有事件监听都委托给document 
 */
function addEvent(dom, eventType, listener, componentInstance) {

  eventType = eventType.toLocaleLowerCase()

  let eventStore = dom.eventStore || (dom.eventStore = {})

  eventStore[eventType] = { listener, componentInstance }

}

document.addEventListener('click', dispatchEvent, false)

function dispatchEvent(e) {

  let { type, target } = e

  // 由于事件委托不能进行冒泡执行函数，所以只能循环模拟冒泡
  while (target) {

    let { eventStore } = target

    if (eventStore) {
      let { listener, componentInstance } = eventStore['on' + type]
      if (listener) {
        if (componentInstance) {
          componentInstance._isBatchingUpdate = true
        }
        listener.call(null, e)
        if (componentInstance) {
          componentInstance._isBatchingUpdate = false
          componentInstance.forceUpDate()
        }
      }
    }
    target = target.parentNode
  }

}

function render(element, container, componentInstance) {

  if (typeof element === 'string' || typeof element === 'number') {
    return container.appendChild(document.createTextNode(element))
  }

  let { type, props } = element

  const isComponent = type.isComponent

  if (typeof type === 'function') {
    componentInstance = isComponent ? new type() : null
    element = isComponent ? componentInstance.render() : type()
    if (isComponent && componentInstance) {
      // 生命周期的实现 当js描述的dom对象生产的时候
      componentInstance.componentWillMount && componentInstance.componentWillMount()
    }
    type = element.type
    props = element.props
  }

  let realDom = createDom(type, props, componentInstance)
  // 创建好真实dom之后再赋值给实例对象
  if (isComponent && componentInstance) {
    componentInstance.dom = realDom
  }

  container.appendChild(realDom)
  if (isComponent && componentInstance) {
    componentInstance.componentDidMount && componentInstance.componentDidMount()

  }
}

// 把js对象描述的Dom转变为真是浏览器的dom
function createDom(type, props, componentInstance) {

  const dom = document.createElement(type)

  for (let propName in props) {
    if (propName === 'childrens') {
      props.childrens.forEach((item, index) => {
        render(item, dom, componentInstance)
      })
    } else if (propName === 'className') {
      dom.className = props[propName]
    } else if (propName === 'style') {
      let styObj = props[propName]
      for (let vo in styObj) {
        dom.style[vo] = styObj[vo]
      }
    } else if (propName.startsWith('on')) {
      // dom[propName.toLocaleLowerCase()] = props[propName]
      // 生成真实dom时进行事件回调函数处理
      addEvent(dom, propName, props[propName], componentInstance)
    }
    else {
      dom.setAttribute(propName, props[propName])
    }


  }

  if (props.ref) {

    const ref = props.ref

    if (typeof ref === 'string') {
      componentInstance.refs[ref] = dom
    } else if (typeof ref === 'function') {
      ref.call(componentInstance, dom)
    } else if (typeof ref === 'object' && ref !== null) {
      ref.current = dom
    }


  }



  return dom

}

export default { render }