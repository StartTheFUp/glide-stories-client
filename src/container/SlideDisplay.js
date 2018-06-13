import React from 'react'
import SlideText from '../components/SlideText'
import SlideIntro from '../components/SlideIntro'
import SlideImage from '../components/SlideImage'
import SlideCallToAction from '../components/SlideCallToAction'
import './SlideDisplay.css'
import { actions } from '../store.js'

const slideComponents = {
  text: SlideText,
  intro: SlideIntro,
  image: SlideImage,
  callToAction: SlideCallToAction
}

const SlideDisplay = ({handleNextSip, handlePreviousSip, slide}) => {
  return (
    <div className='__SlideDisplay'>
      <div className='previousBtn' onClick={ () => actions.handlePreviousSip() }></div>
      <div className='nextBtn' onClick={ () => actions.handleNextSip() }></div>
      {slideComponents[slide.type](slide)}
    </div>
  )
}

export default SlideDisplay
