import React from 'react'
import { Modal, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { actions } from '../store.js'

const updateSlideUrl = (e) => actions.updateUrl(e)
const closeModal = () => actions.closeModal()
const isEnabled = () => actions.isEnabled()

const ModalInputUrl = (props) =>
  <Modal open={props.modalState} onClose={closeModal} basic size='small' >
    <Modal.Header>Enter tweet URL</Modal.Header>
    <Modal.Content>
      <div className="ui fluid action input">
        <input type="text" placeholder="Search..." onChange={(e) => updateSlideUrl(e.target.value)} />
        <Button disabled={!isEnabled} className="ui button" onClick={() => { actions.closeModal(); props.addSlide(props.type, props.id, props.url) }}>Search</Button>
      </div>
    </Modal.Content>
  </Modal>

export default ModalInputUrl
