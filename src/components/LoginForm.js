import React from 'react'
import { Link } from '@reach/router'
import AuthForm from './AuthForm'
import HomeHeader from '../components/HomeHeader'

const LoginForm = ({ onSubmit, errors }) => (
  <React.Fragment>
    <HomeHeader />
    <AuthForm
      onSubmit={onSubmit}
      headerMessage='Log-in to your account'
      error={errors.login}
      actionName='Login'>
      New to us? <Link to='/signup'>Sign Up</Link>
    </AuthForm>
  </React.Fragment>
)

export default LoginForm
