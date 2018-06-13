import React from 'react'
import '../container/SlideDisplay.css'
import './SlideIntro.css'
import { Button } from 'semantic-ui-react'

const SlideCallToAction = ({ subtitle, title, image, btnLink, btnText }) =>
  <div className='SlideIntro' style={{backgroundImage: `url(${image})`}}>
    <div className="SlideIntroText">
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <Button><a href={btnLink}>{btnText}</a></Button>
    </div>
  </div>

export default SlideCallToAction
