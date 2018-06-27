import React from 'react'
import './EditSlideImage.css'
import '../container/SlideDisplay.css'
import '../container/SlideEditor.js'
import './SlideImage.css'

const EditSlideImage = ({ slide, onChange }) => {
  const { imageUrl, text } = slide || {}
  return (
    <div className='__SlideDisplay'>
      <div className='EditImage'>
        <div className='SlideImage' style={{display: 'flex'}}>
          <input type='file' style={{ padding: '0 10px' }}/>
          <div className='img' style={{
            backgroundImage: `url("${imageUrl}")`,
            margin: '10px 0'
          }} />
          <div className='EditText'>
            <textarea
              maxLength='120'
              rows='2'
              wrap='hard'
              placeholer='Type your text here'
              value={slide && text}
              onChange={event => onChange(event, 'text')} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default EditSlideImage
