import React, { Component } from 'react'
import './Mysips.css'
import Previewsip from '../components/Previewsip.js'
import Newsip from '../components/Newsip.js'
import { actions } from '../store.js'
import { Redirect, navigate } from '@reach/router'
import { Grid, Container, Modal, Form } from 'semantic-ui-react'
import { createSip, getAllSips } from '../api.js'
import Navbar from '../components/Navbar.js'

class Mysips extends Component {
  componentDidMount() {
    getAllSips()
      .then(actions.loadSips)
  }

  sipTitle = ''

  render() {
    if (!localStorage.token) return <Redirect noThrow to='/' />
    const mysips = this.props.sips.map(mysip =>
      <Previewsip
        key={mysip.id}
        sip={mysip}
        deleteSip={actions.deleteSip}
        remove={this.props.remove}
        selectedId={Number(this.props.id)}
        embed={`<iframe width='400' height='600' src=${window.location.host}/${mysip.id} style='width: 100%;'></iframe>`}
        publicUrl={<a href={`/${mysip.id}`} target="_blank">{`${window.location.host}/${mysip.id}`}</a>}
      />)

    return (
      <React.Fragment>
        <Container fluid>
          <Navbar />
        </Container>
        <Container fluid>
          <div id='mysipsContainer' style={{padding: '5%', backgroundColor: '#F6F9FC'}}>
            <h1 style={{fontFamily: 'Roboto Mono, monospace', color: 'rgb(254, 184, 226)', fontSize: '3rem'}}>My sips</h1>
            <Grid centered doubling columns={3}>
              <Grid.Row>
                <Newsip />
              </Grid.Row>
            </Grid>

            <Grid centered doubling columns={3}>
              <Grid.Row>
                {mysips}
              </Grid.Row>
            </Grid>
          </div>
        </Container>
        <Modal open={this.props.edit} onClose={() => navigate('/mysips')}>
          <Modal.Header>Create a new sip</Modal.Header>
          <Modal.Content>
            <Form onSubmit={() => {
              createSip(this.sipTitle)
                .then(res => (navigate(`/edit/${res.id}`)))
            }} >
              <Form.Field required>
                <label>Sip title : </label>
                <input type="text" required onChange={ (e) => {
                  this.sipTitle = e.target.value
                }} />
                <input type="submit" className="ui button" value="Create" />

              </Form.Field>
            </Form>
          </Modal.Content>
        </Modal>
      </React.Fragment>
    )
  }
}

export default Mysips
