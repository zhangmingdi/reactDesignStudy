
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
  }

  render() {

  }


}





export default { createElement }