import React from 'react'
import '../container/Stories.js'
import './Previewsip.css'
import { Button, Segment, Grid } from 'semantic-ui-react'

const Previewsip = ({ title, slideIntroTitle, slideIntroSubtitle, SlideIntroImage, embed, publicUrl, editSip, deleteSip }) =>
  <Grid.Column>
    <Segment>
      <h3>{title}</h3>
      <div className="SipShare">

        <div className="BoxShare">
          <h4>Embed</h4>
          <textarea>{embed}</textarea>
        </div>

        <div className="BoxShare">
          <h4>Public URL</h4>
          <div className="url">{publicUrl}</div>
        </div>
      </div>

      <div className="PreviewBtn">

        <div className="Previewsip" style={{backgroundImage: `url(${SlideIntroImage})`}}>
          <h1>{slideIntroTitle}</h1>
          <h2>{slideIntroSubtitle}</h2>

        </div>
        <div className="Btn">
          <Button basic color='blue' onClick={() => editSip}>Edit</Button>
          <Button basic color='red' onClick={() => deleteSip}>Delete</Button>
        </div>
      </div>
    </Segment>
  </Grid.Column>

export default Previewsip
