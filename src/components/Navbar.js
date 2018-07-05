import React, { Component } from 'react'
import './Navbar.css'
import { Icon, Menu } from 'semantic-ui-react'

class Navbar extends Component {
  render() {
    return (
       
      <Menu width={16}>

        <Menu.Item name='title'>
          <h3>Websips</h3>
        </Menu.Item>

        <Menu.Item name='sips'>
          <a className="item" href="/mysips">My Sips</a>
        </Menu.Item>

        <Menu.Item position="right" name='account'>
          <a className="item"><Icon name='user' /> My account</a>
        </Menu.Item>

        <Menu.Item name='logout'>
          <a className="item" onClick={this.props.logout}><Icon name='user times' /> Log out</a>
        </Menu.Item>

      </Menu>
    )
  }
}

export default Navbar
