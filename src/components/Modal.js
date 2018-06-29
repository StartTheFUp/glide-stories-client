import React from 'react'
import { Modal, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { actions } from '../store.js'

const updateUrl = (e) => actions.updateUrl(e)
const closeModal = () => actions.closeModal()

const ModalInputUrl = (props) =>
  <Modal open={props.modalState} onClose={closeModal} basic size='small' >
    <Modal.Header>Enter tweet URL</Modal.Header>
    <Modal.Content>
      <div className="ui fluid action input">
        <input type="text" placeholder="Search..." onChange={(e) => updateUrl(e.target.value)} />
        <Button disabled={!props.url} className="ui button" onClick={() => { actions.closeModal(); props.addSlide(props.type, props.id, props.url) }}>Search</Button>
      </div>
    </Modal.Content>
  </Modal>

export default ModalInputUrl
