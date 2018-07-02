import React from 'react'
import './EditSlideIntro.css'
import '../container/SlideDisplay.css'
import '../container/SlideEditor.js'

const EditSlideIntro = ({ slide, onChange }) => {
  const { image_url, title, subtitle } = slide || {}
  return (
    <div className='__SlideDisplay'>
      <div className='EditText'>
        <h1>Edit Slide Intro</h1>
        <label>Fake input Placeholder Upload Image</label>
        <input type='file' onChange={event => onChange(event, 'imageUrl')}/>
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
