import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


class ScrollList extends Component {

  constructor(props) {
    super(props)

    this._div = React.createRef()

  }

  componentDidMount() {
    this._timer = setInterval(() => {
      this.setState({
        menberList: [this.state.menberList.length, ...this.state.menberList]
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this._timer)
  }

  getSnapshotBeforeUpdate() {
    return this._div.current.scrollHeight
  }

  componentDidUpdate(prevPros, preState, preScrollHeight) {
    let nextScrollTop = this._div.current.scrollTop
    this._div.current.scrollTop = nextScrollTop + (this._div.current.scrollHeight - preScrollHeight)
  }

  state = {
    menberList: []
  }

  render() {

    const sty = {
      width: "100px",
      height: "100px",
      border: "1px solid red",
      overflow: "auto",

    }

    return (
      <div ref={this._div} style={sty}>
        {this.state.menberList.map((item, index) => (
          <div key={index + ''}>{item}</div>
        ))}
      </div>
    )

  }

}



ReactDOM.render(
  <ScrollList />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
