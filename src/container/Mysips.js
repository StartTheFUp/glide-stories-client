import React, { Component } from 'react'
import './Mysips.css'
import Previewsip from '../components/Previewsip.js'
import Newsip from '../components/Newsip.js'
import Sip from '../components/Sip.js'
import Navbar from './Navbar.js'
import { actions } from '../store.js'
import { Grid, Container } from 'semantic-ui-react'

class Mysips extends Component {
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
      <React.Fragment>
        <Container fluid>
          <Navbar />
          </Container>
          <Container>
          <h1>My sips</h1>
          <Grid centered doubling columns={3}>
            <Grid.Row>
              <Newsip />
            </Grid.Row>
          </Grid>

          <Grid centered doubling columns={3}>
            <Grid.Row>
              <Sip />
              {mysips}
            </Grid.Row>
          </Grid>
          </Container>
      </React.Fragment>
    )
  }
}

export default Mysips
