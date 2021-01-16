function render(element, container) {

  if (typeof element === 'string' || typeof element === 'number') {
    return container.appendChild(document.createTextNode(element))
  }

  let { type, props } = element

  if (typeof type === 'function') {
    element = type.isComponent ? new type().render() : type()
    type = element.type
    props = element.props
  }

  let dom = createDom(type, props)

  container.appendChild(dom)
}


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
    } else {
      dom.setAttribute(propName, props[propName])
    }
  }

  return dom

}













export default { render }