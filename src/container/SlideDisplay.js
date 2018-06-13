import React from 'react'
import SlideText from '../components/SlideText'
import SlideIntro from '../components/SlideIntro'
import SlideImage from '../components/SlideImage'
import SlideCallToAction from '../components/SlideCallToAction'
import './SlideDisplay.css'

const slideComponents = {
  text: SlideText,
  intro: SlideIntro,
  image: SlideImage,
  callToAction: SlideCallToAction
}

const SlideDisplay = ({handleNext, handlePrevious, slide}) => {
  console.log(slide)
  return (
    <div className='__SlideDisplay'>
      <div className='previousBtn' onClick={handlePrevious}></div>
      <div className='nextBtn' onClick={handleNext}></div>
      {slideComponents[slide.type](slide)}
    </div>
  )
}

export default SlideDisplay
