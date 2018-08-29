import { createStore, applyMiddleware } from 'redux'
import { sendUpdatedGlideOrder, sendNewSlide, deleteSlideDB, deleteGlideDB } from './api.js'

const initialState = {
  currentStep: 0,
  glide : {
    slides: []
  },
  inputValue: '',
  warningMessage: false,
  glides: [],
  errors: {},
  profile: {
    email: localStorage.email
  }

}
const reducer = (state, action) => {
  if (action.type === 'LOAD_GLIDE') {
    return {
      ...state,
      glide : action.glide
    }
  }

  if (action.type === 'HANDLE_NEXT_SLIDE') {
    const currentStep = state.currentStep + 1
    if (currentStep >= state.glide.slides.length) {
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
    const currentStep = state.glide.slides.indexOf(action.slide)
    return {
      ...state,
      currentStep
    }
  }

  if (action.type === 'UPDATE_SLIDE') {
    const uid = action.slideContent.uid || state.glide.slides[state.currentStep].uid //
    return {
      ...state,
      glide : {
        ...state.glide,
        slides: state.glide.slides
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

  if (action.type === 'REPLACE_SLIDE') {
    return {
      ...state,
    glide : {
        ...state.glide,
        slides: state.glide.slides
          .map((slide) => {
            if (slide.uid !== action.uid) return slide
            return {
              ...slide,
              ...action.slide
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
    glide : {
        ...state.glide,
        slides: [
          ...state.glide.slides.slice(0, nextStep),
          {
            glideId: state.glide.id,
            id,
            uid: `${action.slide.type}-${id}`,
            ...action.slide
          },
          ...state.glide.slides.slice(nextStep)
        ]
      }
    }
  }

  if (action.type === 'DELETE_SLIDE') {
    const slides = [
      ...state.glide.slides.slice(0, state.currentStep),
      ...state.glide.slides.slice(state.currentStep + 1)
    ]
    return {
      ...state,
      currentStep: Math.min(state.currentStep, slides.length - 1),
    glide : {
        ...state.glide,
        slides
      }
    }
  }

  if (action.type === 'DELETE_GLIDE') {
    return {
      ...state,
      glides: [
        ...state.glides.slice(0, state.glides.indexOf(action.glideContent)),
        ...state.glides.slice(state.glides.indexOf(action.glideContent) + 1)
      ]
    }
  }

  if (action.type === 'UPDATE_URL') {
    return {
      ...state,
      inputValue: action.url
    }
  }

  if (action.type === 'LOAD_GLIDES') {
    return {
      ...state,
      glides: action.glides
    }
  }

  if (action.type === 'APPLY_DRAG') {
    const { removedIndex, addedIndex, payload } = action.event

    if (removedIndex === null && addedIndex === null) return state

    const slides = [...state.glide.slides]
    let itemToAdd = payload

    if (removedIndex !== null) {
      itemToAdd = slides.splice(removedIndex + 1, 1)[0]
    }

    if (addedIndex !== null) {
      slides.splice(addedIndex + 1, 0, itemToAdd)
    }

    return { ...state, glide : { ...state.glide, slides } }
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
        email: action.profile
      }
    }
  }

  return state
}

const saveOrder = state => {
  const glideOrder = state.glide.slides
    .map(slide => slide.uid)
    .join(' ')
  return sendUpdatedGlideOrder(glideOrder, state.glide.id)
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
      glideId: state.glide.id,
      url: state.inputValue
    })
    slide.uid = `${action.slide.type}-${slide.id}`
    if (action.slide.type === 'article') { slide.articleLink = slide.articleUrl }
    store.dispatch({ type: 'REPLACE_SLIDE', slide, uid: state.glide.slides[state.currentStep].uid })
  } else if (action.type === 'DELETE_GLIDE') {
    await deleteGlideDB({
      id: action.glideContent.id
    })
  } else if (action.type === 'APPLY_DRAG' || action.type === 'REPLACE_SLIDE') {
    saveOrder(state)
  }
}

export const store = createStore(reducer, initialState, applyMiddleware(updateOrderInDatabase))

export const actions = {
  loadGlide: glide => store.dispatch({ type: 'LOAD_GLIDE', glide}),
  handleNextSlide: () => store.dispatch({ type: 'HANDLE_NEXT_SLIDE' }),
  handlePreviousSlide: () => store.dispatch({ type: 'HANDLE_PREVIOUS_SLIDE' }),
  handleSlideSelection: slide => store.dispatch({ type: 'HANDLE_SLIDE_SELECTION', slide }),
  updateSlide: slideContent => store.dispatch({ type: 'UPDATE_SLIDE', slideContent }),
  updateUrl: url => store.dispatch({ type: 'UPDATE_URL', url }),
  loadGlides: glides => store.dispatch({ type: 'LOAD_GLIDES', glides }),
  applyDrag: event => store.dispatch({ type: 'APPLY_DRAG', event }),
  addSlide: type => store.dispatch({ type: 'ADD_SLIDE', slide: { type } }),
  deleteSlide: slideContent => store.dispatch({ type: 'DELETE_SLIDE', slideContent }),
  deleteGlide: glideContent => store.dispatch({ type: 'DELETE_GLIDE', glideContent }),
  showError: (type, message) => store.dispatch({ type: 'UPDATE_ERROR', error: { type, message } }),
  updateProfile: (profile) => store.dispatch({ type: 'UPDATE_PROFILE', profile })
}
