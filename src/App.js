import React, { Component } from 'react'
import './App.css'

import SlideDisplay from './container/SlideDisplay'

class App extends Component {
  state = {
    currentStep: 0,
    sip: []
  }

  handleNext = () => {
    this.setState({currentStep: this.state.currentStep + 1})
  }

  handlePrevious = () => {
    this.setState({currentStep: this.state.currentStep - 1})
  }

  componentDidMount() {
    fetch('http://localhost:5000/mock')
      .then(res => res.json())
      .then(res => this.setState({sip: res}))
  }

  render() {
    if (this.state.currentStep < this.state.sip.length) {
      return (
        <div>
          <SlideDisplay handleNext={this.handleNext}
            handlePrevious={this.handlePrevious}
            slide={this.state.sip[this.state.currentStep]} />
        </div>
      )
    }
    return <div><p>END</p></div>
  }
}

export default App
