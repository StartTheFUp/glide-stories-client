import React from 'react'
import './EditSlideText.css'
import '../container/SlideDisplay.css'
import '../container/SipEditor.js'

const EditSlideText = ({ slide, onChange }) =>
  <div className='__SlideDisplay'>
    <div className='EditText'>
      <textarea
        maxLength='300'
        rows='4'
        wrap='hard'
        placeholer='Type your text here'
        value={slide && slide.text}
        placeholder='WRITE HERE'
        onChange={event => onChange(event, 'text')} />
    </div>
  </div>

export default EditSlideText
