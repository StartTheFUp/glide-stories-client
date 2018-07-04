import React, { Component } from 'react'
import './Mysips.css'
import Previewsip from '../components/Previewsip.js'
import Newsip from '../components/Newsip.js'
import Sip from '../components/Sip.js'
import Navbar from './Navbar.js'
import { actions } from '../store.js'
import { navigate, Redirect } from '@reach/router'
import { Grid, Container, Modal, Form } from 'semantic-ui-react'
import  { createSip } from '../api.js'

class Mysips extends Component {
  componentDidMount() {
    fetch(`http://localhost:5000/sips`)
      .then(sips => sips.json())
      .then(actions.loadSips)
  }

  sipTitle = ''

  render() {
    if (!localStorage.token) return <Redirect noThrow to='/' />
    const mysips = this.props.sips.map(mysip =>
      <Previewsip
        key={mysip.id}
        title={mysip.title}
        slideIntroTitle={mysip.slidesIntroTitle}
        slideIntroSubtitle={mysip.subtitle}
        SlideIntroImage={mysip.image_url}
        sipId={mysip.id}
        embed= {`<iframe width='400' height='600' src=http://localhost:3000/${mysip.id} style='width: 100%;'></iframe>`}
        publicUrl={<a href={`/${mysip.id}`} target="_blank">{`localhost/3000/${mysip.id}`}</a>}
      />)

    return (
      <React.Fragment>
        <Container fluid>
          <Navbar logout={() => {
            localStorage.clear()
            navigate('/')
          }} />
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
        <Modal open={this.props.edit} onClose={() => navigate('/mysips')}>
          <Modal.Description>
            Create a new sip
            <Form onSubmit={() => createSip(this.sipTitle)} >
              <Form.Field required>
                <label>Sip title : </label>
                <input type="text" onChange={ (e) => {
                  this.sipTitle = e.target.value
                  console.log(this.sipTitle)
                }} />
                <input type="submit" className="ui button" value="Create" />
              </Form.Field>
            </Form>
          </Modal.Description>

        </Modal>
      </React.Fragment>
    )
  }
}

export default Mysips
