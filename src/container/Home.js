import React from 'react'
import LoginForm from '../components/LoginForm'
import { Redirect, navigate } from '@reach/router'
import SignUpForm from '../components/SignUpForm'
import { sendLogin, sendSignUp } from '../api'
import { actions } from '../store'

const getFormBody = event => {
  event.preventDefault()
  return [...event.target]
    .filter(input => input.name)
    .reduce((acc, { value, name }) => {
      acc[name] = value
      return acc
    }, {})
}

const signUp = (event) => {
  sendSignUp(getFormBody(event))
    .then(({ token, email, error }) => {
      if (error) {
        actions.showError('signup', error)
      } else {
        localStorage.token = token || ''
        localStorage.email = email || ''
        actions.updateProfile(email)
        navigate('/myglides')
      }
    })
}

const login = (event) => {
  sendLogin(getFormBody(event))
    .then(({ token, email, error }) => {
      if (error) {
        actions.showError('login', error)
      } else {
        localStorage.token = token || ''
        localStorage.email = email || 'test'
        actions.updateProfile(email)
        navigate('/myglides')
      }
    })
}

const Home = (props) => {
  if (localStorage.token) return <Redirect noThrow to='/myglides' />
  if (props.signUp) {
    return <SignUpForm onSubmit={signUp} {...props} />
  }
  return <LoginForm onSubmit={login} {...props} />
}

export default Home
