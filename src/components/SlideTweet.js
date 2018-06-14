import React from 'react'
import './SlideTweet.css'

const SlideTweet = ({authorPicture, authorName, authorScreenName, text, createdAt}) =>
  <div className='tweetQuote'>
    <span className='tweetHead'>
      <img src={ authorPicture } alt={ 'x' }/>
      <p className='authorName'>{ authorName }</p>
      <p className='greyInfo'>{ authorScreenName }</p>
    </span>
    <p>{ text }</p>
    <p className='greyInfo'>{ createdAt }</p>
  </div>

export default SlideTweet