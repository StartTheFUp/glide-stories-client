import React, { Component } from 'react'
import './Navbar.css'
import { Link, navigate } from '@reach/router'
import { Icon, Menu } from 'semantic-ui-react'

const logout = () => {
  localStorage.clear()
  navigate('/')
}

class Navbar extends Component {
  render() {
    return (

      <Menu width={16}>

        <Menu.Item name='title'>
          <h3 style={{fontFamily: 'Roboto Mono, monospace', color: 'rgb(254, 184, 226)'}}>Webglides</h3>
        </Menu.Item>

        <Menu.Item name='glides'>
          <Link to="/myglides">My glides</Link>
        </Menu.Item>

        <Menu.Item position="right" name='account'>
          <Link to='/myaccount' ><Icon name='user' /> My account</Link>
        </Menu.Item>

        <Menu.Item name='logout'>
          <Link to='/' onClick={logout}><Icon name='user times' /> Log out</Link>
        </Menu.Item>

      </Menu>
    )
  }
}

export default Navbar
