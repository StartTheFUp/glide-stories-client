import React from 'react'
import '../container/SlideDisplay.css'
import '../container/SipEditor.js'
import { formatedDate } from '../formatedDate.js'

const EditSlideTweet = ({ slide, onChange }) => {
  const { imageUrl, authorName, authorScreenName, text, publicationDate, tweetUrl } = slide

  return (
    <div className='__SlideDisplay'>
      <div className='EditTweet' style={{flexDirection: 'column'}}>
        <p style={{ marginBottom:'0px', padding:'0vh', fontWeight:'bold' }}>
          Edit tweet link (<span style={{ color: 'red' }}>beware</span> : it will update the whole slide) :
        </p>
        <input
          maxLength='500'
          value={tweetUrl || ''}
          onChange={event => onChange(event, 'tweetUrl')} />
        <div className='quote' style= {{justifyContent: 'center'}}>

          <span className='quoteHead'>
            <img src={imageUrl} alt='Tweet icon' />
            <p className='authorName'>{authorName}</p>
            <p className='greyInfo'>{authorScreenName}</p>
          </span>
          <p>{text}</p>
          <p className='greyInfo'>{formatedDate(publicationDate)}</p>
        </div>
      </div>
    </div>
  )
}
export default EditSlideTweet
