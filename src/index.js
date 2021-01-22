import React, { Component } from './react';
import ReactDOM from './react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

class Form extends Component {


  constructor(props) {

    super(props)

    this.textInput = React.createRef()
  }

  _getfoucs = () => {
    this.textInput.current.getFocus()
  }

  render() {

    return React.createElement('div', {
      className: 'title',
      style: {
        color: 'red'
      },
    },
      React.createElement(TextInput, { ref: this.textInput },),
      React.createElement('button', { onClick: this._getfoucs }, "获取焦点"),
    )

  }

}

class TextInput extends Component {
  constructor(props) {
    super(props)
    this.input = React.createRef()
  }

  getFocus = () => {
    console.log('sssssssssssssss', this.input)
    this.input.current.focus()
    this.input.current.value='sdsjdjslkjdl'
  }

  render() {
    return React.createElement('input', { ref: this.input },)
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
