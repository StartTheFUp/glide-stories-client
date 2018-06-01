import React from 'react'
import './SlideIntro.css'

const SlideIntro = ({ subTitle, title, image }) =>
  <div className='SlideIntro'>
    <p>{title}</p>
    <p>{subTitle}</p>
  </div>

export default SlideIntro
