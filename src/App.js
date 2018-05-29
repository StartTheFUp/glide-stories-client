import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import SlideText from './components/SlideText'


class App extends Component {
  state = {
    currentStep : 1,
    sip : [],
  }

  handleNavigation = () => {
    this.setState({currentStep : this.state.currentStep + 1})
    console.log('lol')
  }

  constructor() {
    super()
    fetch('http://localhost:5000/mock')
      .then(res => res.json())
      .then(res => this.setState({sip : JSON.parse(res)}))
  }

  render () {
    if (this.state.currentStep < this.state.sip.length) {
      return (
        <div>
          <SlideText handleNavigation={this.handleNavigation} slide={this.state.sip[this.state.currentStep]} />
        </div>
      )
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
