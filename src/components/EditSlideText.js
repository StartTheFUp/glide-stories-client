import React from 'react'
import './EditSlideText.css'
import '../container/SlideDisplay.css'
import '../container/SlideEditor.js'

const EditSlideText = ({ slide, onChange }) =>
  <div className="__SlideDisplay">
    <div className="EditText">
      <h1>Edit Slide Text</h1>
      <textarea
        maxLength="300"
        rows="10"
        wrap="hard"
        value={slide && slide.text}
        onChange={event => onChange(event, 'text')} />
    </div>
  </div>

export default EditSlideText
