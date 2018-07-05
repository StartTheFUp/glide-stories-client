import React, { Component } from 'react'
import './Navbar.css'
import { Icon } from 'semantic-ui-react'

// import { actions } from '../store.js'

class Navbar extends Component {
  // componentDidMount() {
  // fetch(`http://localhost:5000/sips/}`)
  //   .then(res => res.json())
  // }
  render() {
    return (
      <div className='Navbar'>
        <div className="ui menu">
          <div className="item">
            <h3>Websips</h3>
          </div>
          <a className="item">My Sips</a>
          <div className="right menu">
            <a className="item"><Icon name='user' /> My account</a>
            <a className="item"><Icon name='user times' /> Log out</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Navbar
