import { createStore } from 'redux'

const initialState = {
  currentStep: 0,
  sip: []
}
const reducer = (state, action) => {
  if (action.type === 'LOAD_SIPS') {
    return {
      ...state,
      sip: action.sips
    }
  }
  if (action.type === 'HANDLE_NEXT_SIP') {
    const currentStep = state.currentStep + 1
    if (currentStep >= state.sip.length) {
      return state
    }
    return {
      ...state,
      currentStep
    }
  }
  if (action.type === 'HANDLE_PREVIOUS_SIP') {
    const currentStep = state.currentStep - 1
    if (currentStep < 0) return state
    return {
      ...state,
      currentStep
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

export const fetchInitialState = () => fetch('http://localhost:5000/mock')
  .then(res => res.json())
  .then(sips => actions.loadSips(sips))
