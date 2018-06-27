import React from 'react'
import './SlideScrapping.css'

const SlideTweet = ({ imageUrl, authorName, authorScreenName, text, publicationDate }) =>
  <div className='quote'>
    <span className='quoteHead'>
      <img src={imageUrl} alt='profile_picture' />
      <p className='authorName'>{authorName}</p>
      <p className='greyInfo'>{authorScreenName}</p>
    </span>
    <p>{text}</p>
    <p className='greyInfo'>{publicationDate}</p>
  </div>

export default SlideTweet
