import React from 'react'
import SlideText from '../components/SlideText'
import SlideIntro from '../components/SlideIntro'
import SlideImageText from '../components/SlideImageText'
import './SlideDisplay.css'


const slideComponents = {
  text: SlideText,
  intro: SlideIntro,
  imageText: SlideImageText

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
