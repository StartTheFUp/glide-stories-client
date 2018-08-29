import React, { Component } from 'react'
import './Myglides.css'
import Previewglide from '../components/Previewglide.js'
import Newglide from '../components/Newglide.js'
import { actions } from '../store.js'
import { Redirect, navigate } from '@reach/router'
import { Grid, Container, Modal, Form } from 'semantic-ui-react'
import { createGlide, getAllGlides } from '../api.js'
import Navbar from '../components/Navbar.js'

class Myglides extends Component {
  componentDidMount() {
    getAllGlides()
      .then(actions.loadGlides)
  }

  glideTitle = ''

  render() {
    if (!localStorage.token) return <Redirect noThrow to='/' />
    const myglides = this.props.glides.map(myglide =>
      <Previewglide
        key={myglide.id}
        glide={myglide}
        deleteGlide={actions.deleteGlide}
        remove={this.props.remove}
        selectedId={Number(this.props.id)}
        embed={`<iframe width='400' height='600' src=${window.location.host}/${myglide.id} style='width: 100%;'></iframe>`}
        publicUrl={<a href={`/${myglide.id}`} target="_blank">{`${window.location.host}/${myglide.id}`}</a>}
      />)

    return (
      <React.Fragment>
        <Container fluid>
          <Navbar />
        </Container>
        <Container fluid>
          <div id='myglidesContainer' style={{padding: '5%', backgroundColor: '#F6F9FC'}}>
            <h1 style={{fontFamily: 'Roboto Mono, monospace', color: 'rgb(254, 184, 226)', fontSize: '3rem'}}>My glides</h1>
            <Grid centered doubling columns={3}>
              <Grid.Row>
                <Newglide />
              </Grid.Row>
            </Grid>

            <Grid centered doubling columns={3}>
              <Grid.Row>
                {myglides}
              </Grid.Row>
            </Grid>
          </div>
        </Container>
        <Modal open={this.props.edit} onClose={() => navigate('/myglides')}>
          <Modal.Header>Create a new </Modal.Header>
          <Modal.Content>
            <Form onSubmit={async () => {
              const { id } = await createGlide(this.glideTitle)
              navigate(`/edit/${id}`)
            }} >
              <Form.Field required>
                <label>Glide title : </label>
                <input type="text" required onChange={ (e) => {
                  this.glideTitle = e.target.value
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

export default Myglides
