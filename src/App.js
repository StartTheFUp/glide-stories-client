import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import './App.css'
import SlideDisplay from './container/SlideDisplay.js'
import { store } from './store.js'
import SipEditor from './container/SlideEditor'
import { Router } from '@reach/router'

class App extends Component {
  constructor() {
    super()
    this.state = store.getState()
    store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  render() {
    return (
      <Router>
        <SlideDisplay {...this.state} path='/:id' />
        <SipEditor {...this.state} path='/edit/:id' inputValue={this.state.inputValue} type={this.state.slideType} modalState={this.state.modalOpen}/>
      </Router>
    )
  }
}
export default App
