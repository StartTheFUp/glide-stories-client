import { createStore, applyMiddleware } from 'redux'
import { sendUpdatedSipOrder, sendNewSlide, deleteSlideDB, deleteSipDB } from './api.js'

const initialState = {
  currentStep: 0,
  sip: {
    slides: []
  },
  inputValue: '',
  warningMessage: false,
  sips: [],
  errors: {},
  profile: {
    email: localStorage.email
  }

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
    const uid = action.slideContent.uid || state.sip.slides[state.currentStep].uid //
    return {
      ...state,
      sip: {
        ...state.sip,
        slides: state.sip.slides
          .map((slide) => {
            if (slide.uid !== uid) return slide
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

  if (action.type === 'DELETE_SLIDE') {
    const slides = [
      ...state.sip.slides.slice(0, state.currentStep),
      ...state.sip.slides.slice(state.currentStep + 1)
    ]
    return {
      ...state,
      currentStep: Math.min(state.currentStep, slides.length - 1),
      sip: {
        ...state.sip,
        slides
      }
    }
  }

  if (action.type === 'DELETE_SIP') {
    return {
      ...state,
      sips: [
        ...state.sips.slice(0, state.sips.indexOf(action.sipContent)),
        ...state.sips.slice(state.sips.indexOf(action.sipContent) + 1)
      ]
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

  if (action.type === 'UPDATE_ERROR') {
    return {
      ...state,
      errors: {
        ...state.errors,
        [action.error.type]: action.error.message
      }
    }
  }

  if (action.type === 'UPDATE_PROFILE') {
    return {
      ...state,
      profile: {
        ...state.profile,
        ...action.profile
      }
    }
  }

  // if (action.type === 'SHOW_FORM_ERROR') {
  //   return {...state,
  //     ...action.errorProfilePage
  //   }
  // }

  return state
}

const saveOrder = state => {
  const sipOrder = state.sip.slides
    .map(slide => slide.uid)
    .join(' ')
  return sendUpdatedSipOrder(sipOrder, state.sip.id)
}

const updateOrderInDatabase = store => next => async action => {
  /// CHECKS
  next(action)
  /// SIDE EFFECTS
  const state = store.getState()

  if (action.type === 'DELETE_SLIDE') {
    await deleteSlideDB({
      type: action.slideContent.type,
      id: action.slideContent.id
    })
    saveOrder(state)
  } else if (action.type === 'ADD_SLIDE') {
    const slide = await sendNewSlide({
      type: action.slide.type,
      sipId: state.sip.id,
      url: state.inputValue
    })
    slide.uid = `${action.slide.type}-${slide.id}`
    store.dispatch({ type: 'UPDATE_SLIDE', slideContent: slide })
    state.sip.slides[state.currentStep] = slide
    saveOrder(state)
  } else if (action.type === 'DELETE_SIP') {
    await deleteSipDB({
      id: action.sipContent.id
    })
  } else if (action.type === 'APPLY_DRAG') {
    saveOrder(state)
  }
}

export const store = createStore(reducer, initialState, applyMiddleware(updateOrderInDatabase))

export const actions = {
  loadSip: sip => store.dispatch({ type: 'LOAD_SIP', sip }),
  handleNextSlide: () => store.dispatch({ type: 'HANDLE_NEXT_SLIDE' }),
  handlePreviousSlide: () => store.dispatch({ type: 'HANDLE_PREVIOUS_SLIDE' }),
  handleSlideSelection: slide => store.dispatch({ type: 'HANDLE_SLIDE_SELECTION', slide }),
  updateSlide: slideContent => store.dispatch({ type: 'UPDATE_SLIDE', slideContent }),
  updateUrl: url => store.dispatch({ type: 'UPDATE_URL', url }),
  loadSips: sips => store.dispatch({ type: 'LOAD_SIPS', sips }),
  applyDrag: event => store.dispatch({ type: 'APPLY_DRAG', event }),
  addSlide: type => store.dispatch({ type: 'ADD_SLIDE', slide: { type } }),
  deleteSlide: slideContent => store.dispatch({ type: 'DELETE_SLIDE', slideContent }),
  deleteSip: sipContent => store.dispatch({ type: 'DELETE_SIP', sipContent }),
  showError: (type, message) => store.dispatch({ type: 'UPDATE_ERROR', error: { type, message } }),
  updateProfile: (profile) => store.dispatch({ type: 'UPDATE_PROFILE', profile })
  // showProfileError: error => store.dispatch({ type: 'SHOW_FORM_ERROR', errorProfilePage: error })
}
