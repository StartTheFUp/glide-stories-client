import React from 'react'
import { Modal, Form, Message } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const messages = {
  tweet: 'Enter a tweet URL',
  article: 'Enter an article URL'
}

const ModalInputUrl = ({ onClose, onChange, onSubmit, open, url, type }) => {
  const messageWarning = url ? '' : <Message content='Please enter an URL address'/>

  console.log({ url })
  return (
    <Modal open={open} onClose={onClose} basic size='small' >
      <Modal.Header><p>{messages[type]}</p></Modal.Header>
      <Modal.Content>
        <Form onSubmit={e => {
          e.preventDefault()
          onSubmit(e)
        }}>
          <div className="ui fluid action input">
            <input type="url" value={url} placeholder="https://..." onChange={onChange} />
            <input type="submit" disabled={!url} className="ui button" value="Search" />
          </div>
          <div>{messageWarning}</div>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default ModalInputUrl
