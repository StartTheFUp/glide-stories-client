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
        <div className='previousBtn' onClick={handlePrevious}>Previous</div>
        <div className='nextBtn' onClick={handleNext}>Next</div>
        {slideComponents[slide.type](slide)}
        <div className='test'></div>
      </div>

    </React.Fragment>
  )
}

export default SlideDisplay
