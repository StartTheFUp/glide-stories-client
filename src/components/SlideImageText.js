import React from 'react'
import './SlideImageText.css'

const SlideImageText = ({ text, image }) =>
  <div className='SlideImage'>
    <img src={image} alt='#' />
    <p>{text}</p>
  </div>

export default SlideImageText
