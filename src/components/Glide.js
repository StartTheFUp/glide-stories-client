import React from 'react'
import '../container/Myglides.js'
import './Previewglide.css'
import { Segment, Grid } from 'semantic-ui-react'

const Glide = () =>
  <Grid.Column>
    <Segment>
      <h3>New </h3>
      <div className="GlideShare">

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

        <div className="Previewglide">
          <h1>Hey</h1>
          <h2>Hey</h2>

        </div>

      </div>
    </Segment>
  </Grid.Column>

export default Glide
