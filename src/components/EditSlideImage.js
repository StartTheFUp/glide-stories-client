import React from 'react'
import './EditSlideImage.css'
import '../container/SlideDisplay.css'
import '../container/SlideEditor.js'

const EditSlideImage = ({ slide, onChange }) => {
  const { image_url, title, subtitle } = slide || {}
  return (
    <div className="__SlideDisplay">
      <div className="EditText">
        <h1>Edit Slide Image</h1>
        <label>Fake input Placeholder Upload Image</label>
        <input type="file"></input>
        <input
          maxLength="300"
          value={title}
          onChange={event => onChange(event, 'title')} />
        <input
          maxLength="300"
          value={subtitle}
          onChange={event => onChange(event, 'subtitle')} />
      </div>
    </div>
  )
}
export default EditSlideImage
