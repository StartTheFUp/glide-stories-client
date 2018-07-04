import React from 'react'
import '../container/Mysips.js'
import './Previewsip.css'
import { Button, Segment, Grid } from 'semantic-ui-react'
import { Link } from '@reach/router'

const Previewsip = ({ title, slideIntroTitle, slideIntroSubtitle, SlideIntroImage, embed, publicUrl, sipId, deleteSip }) =>
  <Grid.Column>
    <Segment>
      <h3>{title}</h3>
      <div className="SipShare">

        <div className="BoxShare">
          <h4>Embed</h4>
          <textarea readonly="readonly" rows='3'>{embed}</textarea>
        </div>

        <div className="BoxShare">
          <h4>Public URL</h4>
          <div className="url">{publicUrl}</div>
        </div>
      </div>

      <div className="PreviewBtn">
      <Link to={`/edit/${sipId}`} >
        <div className="Previewsip" style={
          {backgroundImage: `url(${SlideIntroImage})`,
          backgroundSize: 'cover'}
        }>
          <h1>{slideIntroTitle}</h1>
          <h2>{slideIntroSubtitle}</h2>

        </div>
        </Link>
        <div className="Btn">
          <Button basic color='blue'><Link to={`/edit/${sipId}`} >Edit</Link></Button>
          <Button basic color='red' onClick={() => deleteSip}>Delete</Button>
        </div>
      </div>
    </Segment>
  </Grid.Column>

export default Previewsip
