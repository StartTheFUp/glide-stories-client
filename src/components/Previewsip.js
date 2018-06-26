import React from 'react'
import '../container/Stories.js'
import './Previewsip.css'
import { Button, Segment } from 'semantic-ui-react'


const Previewsip = ({ title, slideIntro, embed, publicUrl, editSip, deleteSip }) =>
    <Segment padded>
    <h3>{title}</h3>
    <div className="PreviewBtn">
      <div className="Previewsip">{slideIntro}</div>
      <div className="Btn">
        <Button basic color='blue' onClick={() => embed}>Embed</Button>
        <Button basic color='blue' onClick={() => publicUrl}>Public URL</Button>
        <Button basic color='blue' onClick={() => editSip}>Edit</Button>
        <Button basic color='red' onClick={() => deleteSip}>Delete</Button>
      </div>
    </div>
    </Segment>

export default Previewsip
