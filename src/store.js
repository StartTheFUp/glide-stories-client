import { createStore, applyMiddleware } from 'redux'
import { sendUpdatedSipOrder, sendNewSlide } from './api.js'

const initialState = {
  currentStep: 0,
  sip: {
    slides: []
  },
  modalOpen: false,
  slideType: '',
  inputValue: '',
  warningMessage: false,
  sips: []

}
const reducer = (state, action) => {
  if (action.type === 'LOAD_SIP') {
    return {
      ...state,
      sip: action.sip
    }
  }

  if (action.type === 'HANDLE_NEXT_SLIDE') {
    const currentStep = state.currentStep + 1
    if (currentStep >= state.sip.slides.length) {
      return state
    }
    return {
      ...state,
      currentStep
    }
  }

  if (action.type === 'HANDLE_PREVIOUS_SLIDE') {
    const currentStep = state.currentStep - 1
    if (currentStep < 0) return state
    return {
      ...state,
      currentStep
    }
  }

  if (action.type === 'HANDLE_SLIDE_SELECTION') {
    const currentStep = state.sip.slides.indexOf(action.slide)
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

  if (action.type === 'ADD_SLIDE') {
    const nextStep = state.currentStep + 1
    const id = Math.random()
    return {
      ...state,
      currentStep: nextStep,
      sip: {
        ...state.sip,
        slides: [
          ...state.sip.slides.slice(0, nextStep),
          {
            sipId: state.sip.id,
            id,
            uid: `${action.slide.type}-${id}`,
            ...action.slide
          },
          ...state.sip.slides.slice(nextStep)
        ]
      }
    }
  }

  if (action.type === 'SHOW_MODAL') {
    return {
      ...state,
      modalOpen: true,
      slideType: action.slideType
    }
  }

  if (action.type === 'CLOSE_MODAL') {
    return {
      ...state,
      modalOpen: false
    }
  }

  if (action.type === 'UPDATE_URL') {
    return {
      ...state,
      inputValue: action.url
    }
  }

  if (action.type === 'LOAD_SIPS') {
    return {
      ...state,
      sips: action.sips
    }
  }

  if (action.type === 'APPLY_DRAG') {
    const { removedIndex, addedIndex, payload } = action.event

    if (removedIndex === null && addedIndex === null) return state

    const slides = [...state.sip.slides]
    let itemToAdd = payload

    if (removedIndex !== null) {
      itemToAdd = slides.splice(removedIndex + 1, 1)[0]
    }

    if (addedIndex !== null) {
      slides.splice(addedIndex + 1, 0, itemToAdd)
    }

    return { ...state, sip: { ...state.sip, slides } }
  }

  return state
}

const updateOrderInDatabase = store => next => async action => {
  /// CHECKS
  next(action)
  /// SIDE EFFECTS
  const state = store.getState()
  switch (action.type) {
    case 'ADD_SLIDE': {
      const slide = await sendNewSlide({
        type: action.slide.type,
        sipId: state.sip.id,
        url: state.inputValue
      })
      slide.uid = `${action.slide.type}-${slide.id}`
      store.dispatch({ type: 'UPDATE_SLIDE', slideContent: slide })
      state.sip.slides[state.currentStep] = slide
    } // eslint-disable-next-line
    case 'APPLY_DRAG': {
      const sipOrder = state.sip.slides
        .map(slide => slide.uid)
        .join(' ')

      return sendUpdatedSipOrder(sipOrder, state.sip.id)
    }
    default: return
  }
}

export const store = createStore(reducer, initialState, applyMiddleware(updateOrderInDatabase))

export const actions = {
  loadSip: sip => store.dispatch({ type: 'LOAD_SIP', sip }),
  handleNextSlide: () => store.dispatch({ type: 'HANDLE_NEXT_SLIDE' }),
  handlePreviousSlide: () => store.dispatch({ type: 'HANDLE_PREVIOUS_SLIDE' }),

  handleSlideSelection: slide => store.dispatch({ type: 'HANDLE_SLIDE_SELECTION', slide }),
  updateSlide: slideContent => store.dispatch({ type: 'UPDATE_SLIDE', slideContent }),
  showModal: (slideType) => store.dispatch({ type: 'SHOW_MODAL', slideType: slideType }),
  closeModal: () => store.dispatch({ type: 'CLOSE_MODAL' }),
  updateUrl: url => store.dispatch({ type: 'UPDATE_URL', url }),
  loadSips: sips => store.dispatch({ type: 'LOAD_SIPS', sips }),
  applyDrag: event => store.dispatch({ type: 'APPLY_DRAG', event }),
  addSlide: type => store.dispatch({ type: 'ADD_SLIDE', slide: { type } })
}
