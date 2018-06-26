import React from 'react'
import './EditSlideIntro.css'
import '../container/SlideDisplay.css'
import '../container/SlideEditor.js'

const EditSlideIntro = ({ slide, onChange }) => {
  const { imageUrl, title, subtitle } = slide || {}
  return (
    <div className='__SlideDisplay'>
      <div className='EditIntro' style={{backgroundImage: `url("${imageUrl}")`}}>
        <input type='file' />
        <input
          maxLength='300'
          value={title}
          onChange={event => onChange(event, 'title')} />
        <input
          maxLength='300'
          value={subtitle}
          onChange={event => onChange(event, 'subtitle')} />
      </div>
    </div>
  )
}
export default EditSlideIntro
