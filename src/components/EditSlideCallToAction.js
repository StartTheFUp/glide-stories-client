import React from 'react'
import './EditSlideCallToAction.css'
import '../container/SlideDisplay.css'
import '../container/SlideEditor.js'

const EditSlideCallToAction = ({ slide, onChange }) => {
  const { image_url, title, subtitle } = slide || {}
  return (
    <div className='__SlideDisplay'>
      <div className='EditText'>
        <h1>Edit Call To Action</h1>
        <label>Fake input Placeholder Upload Image</label>
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
export default EditSlideCallToAction
