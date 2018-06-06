import React from 'react'
import './SlideIntro.css'

const SlideIntro = ({ subTitle, title, image }) =>
  <div className='SlideIntro' style={{backgroundImage: `url(${image})`}}>
    <div>
      <h1>{title}</h1>
      <h2>{subTitle}</h2>
    </div>
  </div>

export default SlideIntro
