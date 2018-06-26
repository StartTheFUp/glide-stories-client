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
        <h1><input
          maxLength='60'
          value={title}
          onChange={event => onChange(event, 'title')} /></h1>
        <h2><input
          maxLength='250'
          value={subtitle}
          onChange={event => onChange(event, 'subtitle')} /></h2>
      </div>
    </div>
  )
}
export default EditSlideIntro
