import React from 'react'
import '../container/Mysips.js'
import './Newsip.css'
import Addsip from './Addsip.png'
import { Segment, Grid } from 'semantic-ui-react'
import { Link } from '@reach/router'

const Newsip = () =>
  <Grid.Column>
    <Link to={`/mysips/new`} >

      <Segment>
        <div className="BtnNewsip">
          <img src={Addsip} width="100" alt="add sip icon" />
          <h3>Add a new sip</h3>
        </div>

      </Segment>
    </Link>

  </Grid.Column>

export default Newsip
