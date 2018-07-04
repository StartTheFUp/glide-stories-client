import React from 'react'
import '../container/SlideDisplay.css'
import '../container/SipEditor.js'
import './SlideImage.css'

const EditSlideImage = ({ slide, onChange }) => {
  const { imageUrl, text } = slide || {}
  return (
    <div className='__SlideDisplay'>
      <div className='EditImage'>
        <div className='SlideImage' style={{display: 'flex'}}>
          <div className='uploadImageInput' >
            <label for='image_uploads'>Upload a picture (PNG, JPG)</label>
            <input type='file' style={{ padding: '0 10px' }} name='image_uploads' onChange={event => onChange(event, 'imageUrl')}/>
          </div>
          <div className='img' style={{
            backgroundImage: `url("${imageUrl}")`,
            margin: '10px 0'}} />
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
