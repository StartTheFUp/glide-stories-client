import React from 'react'
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react'
import './MyAccount.css'
import Navbar from './Navbar.js'
import { sendSignUp } from '../api'

const MyAccount = ({ actionName, onSubmit, error, children }) => {
  const form = {
    email: '',
    password: ''
  }
  return (
    <div className='UpdateUserAccount'>
      <Navbar />
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <h1>Update my profile</h1>
          </Header>
          <Form size='large' onSubmit={() => {
            console.log('lol')
            sendSignUp(form)
          }}
          >
            <Segment stacked>
              <Form.Input
                onChange={e => form.email = e.target.value }
                name='email'
                fluid
                icon='user'
                iconPosition='left'
                placeholder='E-mail address'
              />
              <Form.Input
                onChange={e => form.password = e.target.value}
                fluid
                name='password'
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
              />
              <Form.Input
                fluid
                name='confirm password'
                icon='lock'
                iconPosition='left'
                placeholder='Confirm your Password'
                type='password'
              />

              <Button color='teal' fluid size='large'>
                Save Changes
              </Button>
            </Segment>
          </Form>
          <Message negative={Boolean(error)}>
            {error || children}
          </Message>
        </Grid.Column>
      </Grid>
    </div>)
}

export default MyAccount
