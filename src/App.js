import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import './App.css'
import SlideDisplay from './container/SlideDisplay.js'
import { store } from './store.js'
import SlideEditor from './container/SlideEditor'
import Mysips from './container/Mysips.js'
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
        <Mysips {...this.state} path='/mysips' />
        <SlideDisplay {...this.state} path='/:id' />
        <SlideEditor {...this.state} path='/edit/:id' />
      </Router>
    )
  }
}
export default App
