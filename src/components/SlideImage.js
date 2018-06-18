import React from 'react'
import './SlideImage.css'

const SlideImage = ({ text, image }) =>
  <div className='SlideImage'>
    <div className='img' style={{backgroundImage: `url(${image})`}}></div>
    <p>{text}</p>
  </div>

export default SlideImage
