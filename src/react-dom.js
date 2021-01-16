function render(element, container) {

  if (typeof element === 'string' || typeof element === 'number') {
    return container.appendChild(document.createTextNode(element))
  }

  const { type, props } = element

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

  container.appendChild(dom)

}
















export default { render }