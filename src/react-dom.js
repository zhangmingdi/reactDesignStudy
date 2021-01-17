
export function updateComponent(componentInstance) {
  //拿出js描述的dom
  const element = componentInstance.render()

  let { type, props } = element

  let dom = createDom(type, props)

  componentInstance.dom.parentNode.replaceChild(dom, componentInstance.dom)

  componentInstance.dom = dom

}


function render(element, container) {

  if (typeof element === 'string' || typeof element === 'number') {
    return container.appendChild(document.createTextNode(element))
  }

  let { type, props } = element

  const isComponent = type.isComponent
  let componentInstance
  if (typeof type === 'function') {
    componentInstance = isComponent ? new type() : null
    element = isComponent ? componentInstance.render() : type()
    type = element.type
    props = element.props
  }

  let realDom = createDom(type, props)
  // 创建好真实dom之后再赋值给实例对象
  if (isComponent && componentInstance) {
    componentInstance.dom = realDom
    componentInstance.abc = 132456

  }


  container.appendChild(realDom)

}


// 把js对象描述的Dom转变为真是浏览器的dom
function createDom(type, props) {

  const dom = document.createElement(type)

  for (let propName in props) {
    if (propName === 'childrens') {
      props.childrens.forEach((item, index) => {
        render(item, dom)
      })
    } else if (propName === 'className') {
      dom.className = props[propName]
    } else if (propName === 'style') {
      let styObj = props[propName]
      for (let vo in styObj) {
        dom.style[vo] = styObj[vo]
      }
    } else if (propName.startsWith('on')) {
      dom[propName.toLocaleLowerCase()] = props[propName]
    }
    else {
      dom.setAttribute(propName, props[propName])
    }
  }

  return dom

}













export default { render }