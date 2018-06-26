import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import './App.css'
import SlideDisplay from './container/SlideDisplay.js'
import { store } from './store.js'
import SlideEditor from './container/SlideEditor'
import Stories from './container/Stories.js'
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
        <Stories path='/stories' />
        <SlideDisplay {...this.state} path='/:id' />
        <SlideEditor {...this.state} path='/edit/:id' />
      </Router>
    )
  }
}
export default App
