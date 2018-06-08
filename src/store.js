import { createStore } from 'redux'

const initialState = {
    currentStep: 0,
    sip: []
}

const reducer = (state, action) => {
  if (action.type === 'LOAD_SIPS') {
    return {
      sip: action.sip
    }
  }
  return state
}

const store createStore(reducer, initialState)

const actions = {
  loadSips : sip => store.dispatch({ type: 'LOAD_SIPS', sip: sip})
}

  fetch('http://localhost:5000/mock')
    .then(res => res.json())
    .then(res => actions.loadSips(sip)
