import React from 'react'
import { Modal, Form, Message } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { actions } from '../store.js'

const messages = {
  tweet: 'Enter a tweet URL',
  article: 'Enter an article URL'
}

const ModalInputUrl = ({ onClose, onChange, onSubmit, open, url, type }) => {
  const messageWarning = url ? '' : <Message style={{margin: '0px'}} content='Please enter an URL address'/>

  const inputAccordingToType = (type) => {
    if (type === 'tweet') {
      return <input value={url}
        placeholder="https://..."
        onChange={onChange}
        pattern='(https?:\/\/)(twitter.com)\/([a-zA-Z0-9_]*)\/(status)\/([0-9]*)'
        title="Exemple of right tweet url format: https://twitter.com/tagesschau/status/1019842394743820289"/>
    } return <input type='url' value={url} placeholder="https://..." onChange={onChange} />
  }

  return (
    <Modal open={open} onClose={onClose} basic size='small' >
      <Modal.Header><p>{messages[type]}</p></Modal.Header>
      <Modal.Content>
        <Form onSubmit={e => {
          e.preventDefault()
          onSubmit(e)
          actions.updateUrl('')
          onClose()
        }}>
          <div className="ui fluid action input">
            {inputAccordingToType(type)}
            <input type="submit" disabled={!url} className="ui button" value="Search" />
          </div>
          {messageWarning}
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default ModalInputUrl
