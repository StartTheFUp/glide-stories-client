import React from 'react'
import './SlideIntro.css'
import { Button } from 'semantic-ui-react'

const SlideCallToAction = ({ subTitle, title, image, btnLink, btnText }) =>
  <div className='SlideIntro'>
    <p>{title}</p>
    <p>{subTitle}</p>
    <Button><a href={btnLink}>{btnText}</a></Button>
  </div>

export default SlideCallToAction
