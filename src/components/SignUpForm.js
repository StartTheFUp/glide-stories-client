import React from 'react'
import { Link } from '@reach/router'
import AuthForm from './AuthForm'

const SignUpForm = ({ onSubmit, errors }) => (
  <AuthForm
    onSubmit={onSubmit}
    error={errors.signup}
    headerMessage='Hi, Sign up to create your own, personnal and free for ever account'
    actionName='Sign Up'>
    Already a member? <Link to='/'>Sign In</Link>
  </AuthForm>
)

export default SignUpForm
