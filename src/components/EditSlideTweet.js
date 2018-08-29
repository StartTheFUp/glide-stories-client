import React from 'react'
import '../container/SlideDisplay.css'
import '../container/GlideEditor.js'
import { formatedDate } from '../formatedDate.js'

const EditSlideTweet = ({ slide, onChange }) => {
  const { imageUrl, authorName, authorScreenName, text, publicationDate, tweetUrl } = slide
  const tweetRegex = RegExp('(https?:\/\/)(twitter.com)\/([a-zA-Z0-9_]*)\/(status)\/([0-9]*)') // eslint-disable-line
  const messageWarning = tweetUrl
    ? (!tweetRegex.test(tweetUrl))
      ? <p style={{margin: '0px', padding: '0px', color: 'red'}}>Exemple of right tweet url format: https://twitter.com/tagesschau/status/1019842394743820289</p>
      : ''
    : <p style={{margin: '0px', padding: '0px', color: 'red'}}>Please enter an URL address</p>

  return (
    <div className='__SlideDisplay'>
      <div className='EditTweet' style={{flexDirection: 'column'}}>
        <p style={{ marginBottom: '0px', padding: '0vh', fontWeight: 'bold' }}>
          Edit tweet link (<span style={{ color: 'red' }}>beware</span> : it will update the whole slide) :
        </p>
        <input
          maxLength='500'
          value={tweetUrl || ''}
          onChange={event => onChange(event, 'tweetUrl')}
          required />
        {messageWarning}
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
