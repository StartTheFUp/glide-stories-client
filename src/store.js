import { createStore } from 'redux'

const initialState = {
  currentStep: 0,
  sip: {
    slides: []
  },
  sips: []
}
const reducer = (state, action) => {
  console.log(state, state.sip.slides.length, action)
  if (action.type === 'LOAD_SIP') {
    return {
      ...state,
      sip: action.sip
    }
  }
  if (action.type === 'HANDLE_NEXT_SIP') {
    const currentStep = state.currentStep + 1
    if (currentStep >= state.sip.slides.length) {
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

  if (action.type === 'UPDATE_SLIDE') {
    return {
      ...state,
      sip: {
        ...state.sip,
        slides: state.sip.slides
          .map((slide, step) => {
            if (step !== state.currentStep) return slide
            return {
              ...slide,
              ...action.slideContent
            }
          })
      }
    }
  }

  if (action.type === 'DISPLAY_SIPS') {
    return {
      ...state,
      sips: action.sips
    }
  }

  return state
}

export const store = createStore(reducer, initialState)

export const actions = {
  loadSip: sip => store.dispatch({ type: 'LOAD_SIP', sip }),
  handleNextSip: () => store.dispatch({ type: 'HANDLE_NEXT_SIP' }),
  handlePreviousSip: () => store.dispatch({ type: 'HANDLE_PREVIOUS_SIP' }),
  updateSlide: slideContent => store.dispatch({ type: 'UPDATE_SLIDE', slideContent }),
  displaySips: sips => store.dispatch({ type: 'DISPLAY_SIPS', sips })

}
