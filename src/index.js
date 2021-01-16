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

class Element extends Component {

  render() {

    return React.createElement('h2', {
      className: 'title',
      style: {
        color: 'red'
      }
    },
      "hello",
      React.createElement('span', null, "嘤嘤嘤"))

  }

}

let element = React.createElement(Element, {})

ReactDOM.render(
  element,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
