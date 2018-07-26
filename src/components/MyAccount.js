import React from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import './MyAccount.css'
import Navbar from './Navbar.js'
import { actions } from '../store.js'
import { sendSignUp } from '../api.js'

const getFormBody = event => {
  event.preventDefault()
  return [...event.target]
    .filter(input => input.name)
    .reduce((acc, { value, name }) => {
      acc[name] = value
      return acc
    }, {})
}

const updateProfile = (event) => {
  sendSignUp(getFormBody(event))
    .then(({ token, email, error }) => {
      if (error) {
        actions.showError('profile', error)
      } else {
        localStorage.token = token || ''
        if (email) { localStorage.email = email || '' }
        actions.updateProfile(email)
        actions.showError('profile', 'Your profile is updated !')
      }
    })
}

const MyAccount = ({ profile, errors }) => {
  let email = ''

  return (
    <div className='UpdateUserAccount'>
      <Navbar />
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 650 }}>
          <Header as='h1' textAlign='center' style={{ color: 'rgb(34, 45, 37)',
            fontFamily: 'Roboto Mono, monospace',
            marginTop: '5vh' }}>
            My profile
          </Header>
          <Form id='editProfile' className='ui form' size='large' onSubmit={(e) => {
            if (e.target.password.value !== e.target.passwordBis.value) {
              actions.showError('profile', 'Please write the same password')
            } else {
              updateProfile(e)
            }
          }}>
            <Segment stacked>
              <div className='field'>
                <label>E-mail adress</label>
                <Form.Input
                  name='email'
                  fluid
                  icon='user'
                  iconPosition='left'
                  type='email'
                  value={profile.email || ''}
                  onChange={e => {
                    email = e.target.value
                    actions.updateProfile(email)
                  }}
                />
              </div>
              <div className='field'>
                <label> Password </label>
                <Form.Input
                  fluid
                  name='password'
                  icon='lock'
                  iconPosition='left'
                  placeholder='Type your password'
                  type='password'
                  minLength='6'
                  maxLength='18'
                />
              </div>
              <div className='field'>
                <label>Confirm your password</label>
                <Form.Input
                  fluid
                  name='passwordBis'
                  icon='lock'
                  iconPosition='left'
                  placeholder='Confirm your password'
                  type='password'
                  minLength='6'
                  maxLength='18'
                />
              </div>

              <Button style={{ backgroundColor: 'rgb(34, 45, 37)', color: 'white', fontFamily: 'Roboto Mono, monospace' }} fluid size='large'>
                Save Changes
              </Button>
              { errors.profile ? <div className='ui message'>{errors.profile}</div> : undefined }

            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default MyAccount
