import React, { Component } from 'react'
import './Stories.css'
import Previewsip from '../components/Previewsip.js'
import Newsip from '../components/Newsip.js'
import { actions } from '../store.js'
import { Grid, Container } from 'semantic-ui-react'

class Stories extends Component {
  componentDidMount() {
    fetch(`http://localhost:5000/preview`)
      .then(sips => sips.json())
      .then(actions.loadSips)
  }

  render() {
    const mysips = this.props.sips.map(mysip =>
      <Previewsip
        key={mysip.id}
        title={mysip.title}
        slideIntroTitle={mysip.slidesIntroTitle}
        slideIntroSubtitle={mysip.subtitle}
        SlideIntroImage={mysip.image_url}
        embed='je suis un morceau de code'
        publicUrl='http://websips.com/view/453789' />)

    return (
      <Container>
        <h1>My sips</h1>
        <Grid doubling columns={4}>
          <Grid.Row>
          <Newsip />
          {mysips}
          </Grid.Row>
        </Grid>

      </Container>
    )
  }
}

export default Stories
