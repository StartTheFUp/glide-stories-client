import React from 'react'

const SlideIntro = ({ subTitle, title, image }) =>
  <div style={{backgroundImage: `url(${image})`}} className='SlideIntro'>
    <p>{title}</p>
    <p>{subTitle}</p>
  </div>

export default SlideIntro
