import React from 'react'
import './SlideImage.css'

const SlideImage = ({ text, imageUrl }) =>
  <div className='SlideImage'>
    <div className='img' style={{backgroundImage: `url("${imageUrl}")`}} />
    <p>{text}</p>
  </div>

export default SlideImage
