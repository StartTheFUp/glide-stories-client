import React from 'react'
import { Link } from '@reach/router'
import AuthForm from './AuthForm'

const LoginForm = ({ onSubmit, errors }) => (
  <AuthForm
    onSubmit={onSubmit}
    headerMessage='Log-in to your account'
    error={errors.login}
    actionName='Login'>
    New to us? <Link to='/signup'>Sign Up</Link>
  </AuthForm>
)

export default LoginForm
