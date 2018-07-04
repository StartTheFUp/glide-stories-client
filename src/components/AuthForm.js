import React from 'react'
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react'
import './AuthForm.css'

const AuthForm = ({ headerMessage, actionName, onSubmit, error, children }) => (
  <div className='AuthForm'>
    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          {headerMessage}
        </Header>
        <Form size='large' onSubmit={onSubmit}>
          <Segment stacked>
            <Form.Input name='email' fluid icon='user' iconPosition='left' placeholder='E-mail address' />
            <Form.Input
              fluid
              name='password'
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />

            <Button color='teal' fluid size='large'>
              {actionName}
            </Button>
          </Segment>
        </Form>
        <Message negative={Boolean(error)}>
          {error || children}
        </Message>
      </Grid.Column>
    </Grid>
  </div>
)

export default AuthForm
