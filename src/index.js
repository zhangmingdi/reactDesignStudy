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

    this.textInput = React.createRef()
  }

  _getfoucs = () => {

    // console.log('最终', this.textInput.current)

    // this.textInput.current.focus()
  }

  render() {

    return React.createElement('div', {
      className: 'title',
      style: {
        color: 'red'
      },
    },
      React.createElement(ForwardInput, { ref: this.textInput },),
      React.createElement('button', { onClick: this._getfoucs }, "获取焦点"),
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
