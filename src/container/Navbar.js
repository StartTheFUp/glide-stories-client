import React, { Component } from 'react'
import './Navbar.css'
import { Icon, Menu } from 'semantic-ui-react'

class Navbar extends Component {
  render() {
    return (
      // <div className='Navbar'>
      //   <div className="ui menu">
      //     <div className="item">
      //       <h3>Websips</h3>
      //     </div>
      //     <a className="item" href="/mysips">My Sips</a>
      //     <div className="right menu">
      //       <a className="item"><Icon name='user' /> My account</a>
      //       <a className="item" onClick={this.props.logout}><Icon name='user times' /> Log out</a>
      //     </div>
      //   </div>
      // </div>

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
