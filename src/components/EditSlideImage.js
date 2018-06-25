import React from 'react'
import '../container/SlideDisplay.css'
import '../container/EditSlideImage.css'
import '../container/SlideEditor.js'

const EditSlideImage = ({ slide, onChange }) =>
  <div className="__SlideDisplay">
    <div className="EditImage">
      <img src = "" alt="" />
      <textarea
        maxLength="120"
        value={slide && slide.text}
        onChange={event => onChange(event, 'text')} />
    </div>
  </div>

export default EditSlideImage
