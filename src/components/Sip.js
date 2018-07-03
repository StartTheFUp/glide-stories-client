import React from 'react'
import '../container/Mysips.js'
import './Previewsip.css'
import { Segment, Grid } from 'semantic-ui-react'

const Sip = () =>
<Grid.Column>
    <Segment>
      <h3>New sip</h3>
      <div className="SipShare">

        <div className="BoxShare">
          <h4>Embed</h4>
          <textarea></textarea>
        </div>

        <div className="BoxShare">
          <h4>Public URL</h4>
          <div className="url"></div>
        </div>
      </div>

      <div className="PreviewBtn">

        <div className="Previewsip">
          <h1></h1>
          <h2></h2>

        </div>


      </div>
    </Segment>
  </Grid.Column>

export default Sip
