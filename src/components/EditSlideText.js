import React from 'react'
import './EditSlideText.css'
import '../container/SlideDisplay.css'
import '../container/SlideEditor.js'

const EditSlideText = ({ onChange }) =>
  <div className="__SlideDisplay">
    <div className="EditText">
      <textarea maxLength="300" placeholder="Writte here" rows="10" wrap="hard" onChange={onChange}></textarea>
    </div>
  </div>

export default EditSlideText
