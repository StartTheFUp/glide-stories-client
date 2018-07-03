import React from 'react'
import '../container/Mysips.js'
import './Newsip.css'
import Addsip from './Addsip.png'
import { Segment, Grid } from 'semantic-ui-react'

const Newsip = () =>
  <Grid.Column>
    <Segment>
      <div className="BtnNewsip">
        <img src={Addsip} width="100" alt="add sip icon" />
        <h3>Add a new sip</h3>
      </div>
    </Segment>
  </Grid.Column>

export default Newsip
