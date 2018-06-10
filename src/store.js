import { createStore } from 'redux'

const initialState = {
  currentStep: 0,
  sip: []
}
const reducer = (state, action) => {
  if (action.type === 'LOAD_SIPS') {
    return {
      sip: action.sips
    }
  }
  if (action.type === 'HANDLE_NEXT_SIP') {
    return {
      currentStep: action.currentStep + 1
    }
  }
  if (action.type === 'HANDLE_PREVIOUS_SIP') {
    return {
      currentStep: action.currentStep - 1
    }
  }
  return state
}

export const store = createStore(reducer, initialState)

export const actions = {
  loadSips: sips => store.dispatch({ type: 'LOAD_SIPS', sips }),
  handleNextSip: currentStep => store.dispatch({ type: 'HANDLE_NEXT_SIP', currentStep }),
  handlePreviousSip: currentStep => store.dispatch({ type: 'HANDLE_PREVIOUS_SIP', currentStep })
}
fetch('http://localhost:5000/mock')
  .then(res => res.json())
  .then(sips => actions.loadSips(sips))
