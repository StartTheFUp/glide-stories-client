import React, { Component } from 'react'
import { Modal, Button, Form, Message } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { actions } from '../store.js'

const updateUrl = (e) => actions.updateUrl(e)
const closeModal = () => actions.closeModal()

class ModalInputUrl extends Component {
  render() {
    const modalHeader = () => (this.props.type === 'tweet') ? <p>Enter a tweet URL</p> : <p>Enter an article URL</p>
    const messageWarning = () => (this.props.url === '') ? < Message content='Please enter an URL adresse '/> : ''

    return (
      <Modal open={this.props.modalState} onClose={closeModal} basic size='small' >
        <Modal.Header>{modalHeader()}</Modal.Header>
        <Modal.Content>
          <Form>
            <div className="ui fluid action input">
              <input type="url" placeholder="Search..." onChange={(e) => updateUrl(e.target.value)} />
              <Button disabled={!this.props.url} className="ui button" onClick={() => { this.props.addSlide(this.props.type, this.props.id, this.props.url) }}>Search</Button>
            </div>
            <div>{messageWarning()}</div>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default ModalInputUrl
