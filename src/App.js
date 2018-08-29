import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import './App.css'
import SlideDisplay from './container/SlideDisplay.js'
import { store } from './store.js'
import GlideEditor from './container/GlideEditor'
import Myglides from './container/Myglides.js'
import { Router } from '@reach/router'
import Home from './container/Home'
import MyAccount from './components/MyAccount.js'

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
        <Myglides {...this.state} path='/myglides' />
        <Myglides {...this.state} edit path='/myglides/new' />
        <Myglides {...this.state} remove path='/myglides/:id/remove' />
        <SlideDisplay {...this.state} path='/:id' />
        <GlideEditor {...this.state} path='/edit/:id' inputValue={this.state.inputValue} type={this.state.slideType}/>
        <GlideEditor {...this.state} insertUrl path='/edit/:id/:type' inputValue={this.state.inputValue} type={this.state.slideType} />
        <GlideEditor {...this.state} remove path='/edit/:id/remove' />
        <Home {...this.state} path='/' />
        <Home {...this.state} signUp path='/signup' />
        <MyAccount {... this.state} path='/myaccount'/>

      </Router>
    )
  }
}
export default App
