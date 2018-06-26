import React from 'react'
import './EditSlideImage.css'
import '../container/SlideDisplay.css'
import '../container/SlideEditor.js'

const EditSlideImage = ({ slide, onChange }) => {
  const { imageUrl, text } = slide || {}
  return (
    <div className='__SlideDisplay'>
      <div className='EditImage'>
        <div className='SlideImage'>
          <div className='img' style={{backgroundImage: `url("${imageUrl}")`}} />
          <input type='file' />
          <form>
          <input
            maxLength='120'
            value={slide && text}
            onChange={event => onChange(event, 'text')} />
          </form>
        </div>
      </div>
    </div>
  )
}
export default EditSlideImage
