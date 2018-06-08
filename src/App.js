import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import './App.css'
import SlideDisplay from './container/SlideDisplay.js'
import store from './store.js'

class App extends Component {


  handleNext = () => {
    this.setState({currentStep: this.state.currentStep + 1})
  }

  handlePrevious = () => {
    this.setState({currentStep: this.state.currentStep - 1})
  }



  render() {
    if (this.state.currentStep < this.state.sip.length) {
      return (
        <SlideDisplay handleNext={this.handleNext}
          handlePrevious={this.handlePrevious}
          slide={this.state.sip[this.state.currentStep]} />
      )
    }
    return <div><p>END</p></div>
  }
}

export default App
