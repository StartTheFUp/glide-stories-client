import React from 'react'
import '../container/Myglides.js'
import './Newglide.css'
import Addglide from './Addglide.png'
import { Segment, Grid } from 'semantic-ui-react'
import { Link } from '@reach/router'

const Newglide = () =>
  <Grid.Column>
    <Link to='/myglides/new'>
      <Segment>
        <div className="BtnNewglide">
          <img src={Addglide} width="100" alt="add  icon" />
          <h3>Add a new </h3>
        </div>
      </Segment>
    </Link>
  </Grid.Column>

export default Newglide
