import React, { Component } from 'react'
import './Navbar.css'
import { Icon } from 'semantic-ui-react'

class Navbar extends Component {

  render() {
    return (
      <div className='Navbar'>
        <div class="ui menu">
          <div class="item">
            <h3>Websips</h3>
          </div>
          <a class="item" href="/mysips">My Sips</a>
          <div class="right menu">
            <a class="item"><Icon name='user' /> My account</a>
            <a class="item"><Icon name='user times' /> Log out</a>
          </div>
        </div>

      </div>
    )
  }
}

export default Navbar
