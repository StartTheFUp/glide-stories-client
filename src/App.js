import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import './App.css'
import SlideDisplay from './container/SlideDisplay.js'
import { store } from './store.js'
import EditSlideText from './components/EditSlideText'

class App extends Component {
  constructor() {
    super()
    this.state = store.getState()
    store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  render() {
    // if (this.state.currentStep < this.state.sip.length) {
    //   return (
    //     <SlideDisplay handleNextSip={this.handleNextSip}
    //       handlePreviousSip={this.handlePreviousSip}
    //       slide={this.state.sip[this.state.currentStep]} />
    //   )
    // }
    return <div><EditSlideText /></div>
  }
}
export default App
