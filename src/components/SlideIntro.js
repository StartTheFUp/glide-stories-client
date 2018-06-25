import React from 'react'
import './SlideIntro.css'

const SlideIntro = ({ subtitle, title, image_url }) =>
  <div className='SlideIntro' style={{backgroundImage: `url("${image_url}")`}}>
    <div>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </div>
  </div>

export default SlideIntro
