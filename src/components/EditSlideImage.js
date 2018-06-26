import React from 'react'
import './EditSlideImage.css'
import '../container/SlideDisplay.css'
import '../container/SlideEditor.js'

const EditSlideImage = ({ slide, onChange }) => {
  const { imageUrl, text } = slide || {}
  return (
    <div className='__SlideDisplay'>
      <div className='EditImage'>
        <div className='img' style={{backgroundImage: `url("${imageUrl}")`}} />
        <input type='file' />
        <input
          maxLength='120'
          value={slide && slide.text}
          onChange={event => onChange(event, 'text')} />
      </div>
    </div>
  )
}
export default EditSlideImage
