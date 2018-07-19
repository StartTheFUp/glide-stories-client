import React from 'react'
import { Link } from '@reach/router'
import AuthForm from './AuthForm'
import HomeHeader from '../components/HomeHeader'
import './styleError.css'

const LoginForm = ({ onSubmit, errors }) => (
  <React.Fragment>
    <HomeHeader />
    <AuthForm
      onSubmit={onSubmit}
      headerMessage='Log-in to your account'
      actionName='Login'>
      New to us? <Link to='/signup'>Sign Up</Link>
    </AuthForm>
    { !errors.login ? undefined : <div className='ui message error centerError'>{errors.login}</div> }
  </React.Fragment>
)

export default LoginForm
