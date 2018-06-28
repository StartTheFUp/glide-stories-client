import React from 'react'
import ReactDOM from 'react-dom'

jest.mock('@reach/router', () => ({
  navigate: jest.fn()
}))

it.skip('renders without crashing', () => {
  const div = document.createElement('div')
  // ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})
