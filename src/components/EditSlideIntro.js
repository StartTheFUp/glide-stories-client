import React from 'react'
import '../container/SlideDisplay.css'
import '../container/EditSlideIntro.css'
import '../container/SlideEditor.js'

const EditSlideIntro = ({ slide, onChange }) =>
  <div className="__SlideDisplay">
    <div className="EditIntro">
      <h1><input type = "text"
        maxLength="120"
        value={slide && slide.text}
        onChange={event => onChange(event, 'text')} />
      </h1>
      <h2><input type = "text"
        maxLength="120"
        value={slide && slide.text}
        onChange={event => onChange(event, 'text')} /></h2>
    </div>
  </div>

export default EditSlideIntro
