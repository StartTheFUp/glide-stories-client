import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import SlideText from './components/SlideText'


class App extends Component {
  state = {
    sip : [],
}

  constructor() {
    super()
    fetch('http://localhost:5000/mock')
      .then(res => res.json())
      .then(res => {
        this.setState({sip : JSON.parse(res)})
        console.log(this.state.sip[1].text)
      })

  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.state.sip.map(slide => <SlideText slide={slide} /> )}
      </div>

    )
  }
}

export default App
