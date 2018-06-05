import React from 'react'
import SlideText from '../components/SlideText'
import SlideIntro from '../components/SlideIntro'
import SlideImageText from '../components/SlideImageText'
import SlideCallToAction from '../components/SlideCallToAction'
import './SlideDisplay.css'


const slideComponents = {
  text: SlideText,
  intro: SlideIntro,
  imageText: SlideImageText,
  callToAction: SlideCallToAction,
}

const SlideDisplay = ({handleNext, handlePrevious, slide}) => {
  return (
    <React.Fragment>
      <div className='__SlideDisplay'>
        <div className='previousBtn' onClick={handlePrevious}></div>
        <div className='nextBtn' onClick={handleNext}></div>
        {slideComponents[slide.type](slide)}
      </div>

    </React.Fragment>
  )
}

export default SlideDisplay
