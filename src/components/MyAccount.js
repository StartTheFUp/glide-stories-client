import React from 'react'
import { Button, Input, Form, Grid, Header, Segment } from 'semantic-ui-react'
import './MyAccount.css'
import Navbar from './Navbar.js'
import { actions } from '../store.js'
import './styleError.css'

const MyAccount = ({ profile, errors }) => {
  const form = {
    email: '',
    password: '',
    passwordBis: ''
  }

  return (
    <div className='UpdateUserAccount'>
      <Navbar />
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 650 }}>
          <Header as='h1' color='teal' textAlign='center'>
            My profile
          </Header>
          <Form id='editProfile' className='ui form' size='large' onSubmit={(e) => {
            if (form.password !== form.passwordBis) {
              actions.showError('profile', 'Please write the same password')
            } else { actions.showError('profile', 'Your profile is updated !') }
          }}>
            <Segment stacked>
              <div className='field'>
                <label>E-mail adress</label>
                <Input
                  onChange={e => {
                    form.email = e.target.value
                    actions.updateProfile(form)
                  }}
                  name='email'
                  fluid
                  icon='user'
                  iconPosition='left'
                  type='email'
                  value={profile.email}
                />
              </div>
              <div className='field'>
                <label> Password </label>
                <Input
                  onChange={e => {
                    form.password = e.target.value
                  }}
                  fluid
                  name='password'
                  icon='lock'
                  iconPosition='left'
                  placeholder='Type your password'
                  type='password'
                />
              </div>
              <div className='field'>
                <label>Confirm your password</label>
                <Form.Input
                  onChange={e => {
                    form.passwordBis = e.target.value
                  }}
                  fluid
                  name='confirm password'
                  icon='lock'
                  iconPosition='left'
                  placeholder='Confirm your password'
                  type='password'
                />
              </div>

              <Button color='teal' fluid size='large'>
                Save Changes
              </Button>
              { errors.profile ? <div className='ui message error centerError'>{errors.profile}</div> : undefined }
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default MyAccount
