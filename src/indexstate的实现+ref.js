import React, { Component } from './react';
import ReactDOM from './react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// const element = React.createElement('h2', {
//   className: 'title',
//   style: {
//     color: 'red'
//   }
// }, "hello", React.createElement('h3', null, "word"))

// function Element() {
//   return React.createElement('h2', {
//     className: 'title',
//     style: {
//       color: 'red'
//     }
//   }, "hello", React.createElement('span', null, "嘤嘤嘤"))
// }

class Counter extends Component {

  constructor(props) {
    super(props)
    this.state = { name: '计算器', number: 0 }

    this._input1 = React.createRef()
    this._input2 = React.createRef()
    this._input3 = React.createRef()

  }

  componentWillMount() {
    console.log('生产js对象')
  }

  componentDidMount() {
    console.log('首次挂载')
  }

  _handleClick = () => {

    // console.log('-1', this.state.number)

    // this.setState({ number: this.state.number + 1 }, () => {
    //   console.log('队列完成的回调', this.state.number)
    // })
    // console.log('0', this.state.number)
    // // 因为传this.state给prevate时候this.state已经更新
    // this.setState(prevate => ({ number: prevate.number + 1 }), () => {
    //   console.log('队列完成的回调', this.state.number)
    // })
    // console.log('1', this.state.number)

  }

  _handleDivClick = () => {
  }

  _handleClickAdd = () => {

    console.log(this._input1, this._input2, this._input3)

  }

  render() {
    return React.createElement('div', {
      className: 'title',
      style: {
        color: 'red'
      },
      onClick: this._handleDivClick
    },
      React.createElement('h1', null, this.state.name + this.state.number),
      React.createElement('button', { onClick: this._handleClick }, "+"),
      React.createElement('input', { ref: this._input1 },),
      React.createElement('input', { ref: this._input2 },),
      React.createElement('button', { onClick: this._handleClickAdd }, "++"),
      React.createElement('input', { ref: this._input3 },),
    )

    // return (
    //   <div>
    //     <h1>{this.state.name}{this.state.number}</h1>
    //     <button onClick={this._handleClick}>+</button>
    //   </div>
    // )
  }

}

let element = React.createElement(Counter, {})

ReactDOM.render(
  element,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
