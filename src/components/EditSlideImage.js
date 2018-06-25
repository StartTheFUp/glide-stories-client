import React from 'react'
import '../container/SlideDisplay.css'
import '../container/EditSlideImage.css'
import '../container/SlideEditor.js'

const EditSlideImage = ({ slide, onChange }) =>
  <div className="__SlideDisplay">
    <div className="EditImage">
      <textarea
        maxLength="120"
        rows="10"
        wrap="hard"
        value={slide && slide.text}
        onChange={event => onChange(event, 'text')} />
    </div>
  </div>

export default EditSlideImage
