import React, { Component } from './react';
import ReactDOM from './react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';



const TextInput = (props, ref) => {
  return React.createElement('div', { ref: ref },

    "啊啊阿",
    React.createElement('input',),

  )
}

const ForwardInput = React.forwardRef(TextInput)

class Form extends Component {


  constructor(props) {

    super(props)

    this.state = {
      number: 1
    }

    console.log('1.执行constructor')
  }

  UNSAFE_componentWillMount() {
    console.log('2.UNSAFE_componentWillMount 组件将要挂载')
  }

  componentDidMount() {
    console.log('3.componentDidMount 页面首次渲染完成')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('4.shouldComponentUpdate 性能优化', nextProps, nextState)
    if (nextState.number % 2 !== 0) return false
    return true
  }

  UNSAFE_componentWillUpdate() {
    console.log('5.UNSAFE_componentWillUpdate 即将重新渲染')
  }

  componentDidUpdate() {
    console.log('6.componentDidUpdate 重新渲染完毕')

  }

  _getfoucs = () => {

    this.setState({
      number: this.state.number + 1
    })

  }

  render() {

    return React.createElement('div', {
      className: 'title',
      style: {
        color: 'red'
      },
    },
      React.createElement('button', { onClick: this._getfoucs }, this.state.number),
    )

  }

}



let element = React.createElement(Form, {})

ReactDOM.render(
  element,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
