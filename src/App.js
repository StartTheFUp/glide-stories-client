import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import './App.css'
import SlideDisplay from './container/SlideDisplay.js'
import { store } from './store.js'
import SipEditor from './container/SipEditor'
import Mysips from './container/Mysips.js'
import { Router } from '@reach/router'
import Home from './container/Home'

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
        <Mysips {...this.state} edit path='/mysips/new' />
        <Mysips {...this.state} remove path='/mysips/remove' />
        <SlideDisplay {...this.state} path='/:id' />
        <SipEditor {...this.state} path='/edit/:id' inputValue={this.state.inputValue} type={this.state.slideType}/>
        <SipEditor {...this.state} insertUrl path='/edit/:id/:type' inputValue={this.state.inputValue} type={this.state.slideType} />
        <SipEditor {...this.state} remove path='/edit/:id/remove' />
        <Home {...this.state} path='/' />
        <Home {...this.state} signUp path='/signup' />
      </Router>
    )
  }
}
export default App
