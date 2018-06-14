import React from 'react'
import './SlideTweet.css'

const SlideTweet = ({authorPicture, authorName, authorScreenName, text, publicationDate}) =>
  <div className='tweetQuote'>
    <span className='tweetHead'>
      <img src={ authorPicture } alt= 'profile_picture' />
      <p className='authorName'>{ authorName }</p>
      <p className='greyInfo'>{ authorScreenName }</p>
    </span>
    <p>{ text }</p>
    <p className='greyInfo'>{ publicationDate }</p>
  </div>

export default SlideTweet
