import React from 'react'
import { Link } from '@reach/router'
import AuthForm from './AuthForm'
import HomeHeader from '../components/HomeHeader'

const SignUpForm = ({ onSubmit, errors }) => (
  <React.Fragment>
    <HomeHeader />
    <AuthForm
      onSubmit={onSubmit}
      headerMessage='Hi, Sign up to create your own, personnal and free for ever account'
      actionName='Sign Up'>
      Already a member? <Link to='/'>Sign In</Link>
    </AuthForm>
    {errors.signup ? <div className='ui message'>{errors.signup}</div> : undefined }

  </React.Fragment>
)

export default SignUpForm
