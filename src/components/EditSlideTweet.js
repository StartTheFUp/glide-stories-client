import React from 'react'
import './EditSlideTweet.css'
import '../container/SlideDisplay.css'
import '../container/SlideEditor.js'

const EditSlideTweet = ({ slide, onChange }) => {
  const { imageUrl, authorName, authorScreenName, text, publicationDate, tweetUrl } = slide || {}
  return (
    <div className='__SlideDisplay'>
      <div className='EditTweet' style={{flexDirection: 'column'}}>
        <input
          maxLength='500'
          value={tweetUrl}
          onChange={event => onChange(event, 'tweetUrl')} />
        <div className='quote' style= {{justifyContent: 'center'}}>

          <span className='quoteHead'>
            <img src={imageUrl} alt='Tweet icon' />
            <p className='authorName'>{authorName}</p>
            <p className='greyInfo'>{authorScreenName}</p>
          </span>
          <p>{text}</p>
          <p className='greyInfo'>{publicationDate}</p>
        </div>
      </div>
    </div>
  )
}
export default EditSlideTweet
