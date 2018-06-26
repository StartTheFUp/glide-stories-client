import React from 'react'
import './EditSlideArticleQuote.css'
import '../container/SlideDisplay.css'
import '../container/SlideEditor.js'

const EditSlideArticleQuote = ({ slide, onChange }) => {
  const { source, authorName, text } = slide || {}
  return (
    <div className='__SlideDisplay'>
      <div className='EditText'>
        <h1>Edit Article Quote</h1>
        <input
          maxLength='300'
          value={text}
          onChange={event => onChange(event, 'text')} />
        <input
          maxLength='300'
          value={authorName}
          onChange={event => onChange(event, 'authorName')} />
        <input
          maxLength='300'
          value={source}
          onChange={event => onChange(event, 'source')} />
      </div>
    </div>
  )
}
export default EditSlideArticleQuote
