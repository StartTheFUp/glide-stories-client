import React from 'react'
import './HomeHeader.css'
import { Menu } from 'semantic-ui-react'

const HomeHeader = ({ onSubmit, errors }) =>
  <Menu>
    <Menu.Item name='editorials'>
      <h3 style={{fontFamily: 'Roboto Mono, monospace', color: 'rgb(254, 184, 226)'}}>Webglides</h3>
    </Menu.Item>
  </Menu>

export default HomeHeader
