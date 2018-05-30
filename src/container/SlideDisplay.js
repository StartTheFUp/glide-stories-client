import React from 'react'
import SlideText from '../components/SlideText'
import './SlideDisplay.css'

const slideComponents = {
  text: SlideText
}

const SlideDisplay = ({handleNext, handlePrevious, slide}) => {
  return (
    <div className='__SlideDisplay'>
      <button className='previousBtn' onClick={handlePrevious}>Previous</button>
      <button className='nextBtn' onClick={handleNext}>Next</button>
      {slideComponents[slide.type](slide)}
    </div>
  )
}

export default SlideDisplay
