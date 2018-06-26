import React from 'react'
import './SlideIntro.css'

const SlideIntro = ({ subtitle, title, imageUrl }) =>
  <div className='SlideIntro' style={{backgroundImage: `url("${imageUrl}")`}}>
    <div>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </div>
  </div>

export default SlideIntro
