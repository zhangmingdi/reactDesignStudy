
function createElement(type, config = {}, ...childrens) {

  return {
    type,
    props: {
      ...config,
      childrens
    }
  }

}









export default { createElement }