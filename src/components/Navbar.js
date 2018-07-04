import React, { Component } from 'react'
import './Navbar.css'
import { Icon, Menu } from 'semantic-ui-react'

class Navbar extends Component {
  render() {
    return (

      <Menu>

        <Menu.Item name='editorials'>
          <h3>Websips</h3>
        </Menu.Item>

        <Menu.Item name='reviews'>
          <a className="item" href="/mysips">My Sips</a>
        </Menu.Item>

        <Menu.Item name='upcomingEvents'>
          <a className="item"><Icon name='user' /> My account</a>
        </Menu.Item>

        <Menu.Item name='upcomingEvents'>
          <a className="item" onClick={this.props.logout}><Icon name='user times' /> Log out</a>
        </Menu.Item>

      </Menu>
    )
  }
}

export default Navbar
