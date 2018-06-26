import React from 'react'
import './EditSlideTweet.css'
import '../container/SlideDisplay.css'
import '../container/SlideEditor.js'

const EditSlideTweet = ({ slide, onChange }) => {
  const { imageUrl, authorName, authorScreenName, text, publicationDate } = slide || {}
  return (
    <div className='__SlideDisplay'>
      <div className='EditText'>
        <h1>Edit SlideT weet</h1>
        <label>Fake input Placeholder Upload Image</label>
        <img src={imageUrl} alt='Tweet icon' />
        <input type='file' />
        <input
          maxLength='300'
          value={authorName}
          onChange={event => onChange(event, 'authorName')} />
        <input
          maxLength='300'
          value={authorScreenName}
          onChange={event => onChange(event, 'authorScreenName')} />
        <input
          maxLength='300'
          value={text}
          onChange={event => onChange(event, 'text')} />
        <input
          maxLength='300'
          value={publicationDate}
          onChange={event => onChange(event, 'publicationDate')} />
      </div>
    </div>
  )
}
export default EditSlideTweet
