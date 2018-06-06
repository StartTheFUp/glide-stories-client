import React from 'react'
import './SlideIntro.css'

const SlideIntro = ({ subTitle, title, image }) =>
  <div className='SlideIntro' style={{backgroundImage: `url(${image})`}}>
  	<div>
      <h1 className='text'>{title}</h1>
      <h2 className='text'>{subTitle}</h2>
  	</div>
  </div>

export default SlideIntro
