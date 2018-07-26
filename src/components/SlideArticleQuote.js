import React from 'react'
import './SlideScrapping.css'

const SlideArticleQuote = ({sourceImage, sourceName, authorName, text}) =>
  <div className='quote'>
    <span className='quoteHead'>
      <img src={sourceImage} alt='Article source icon' />
      <p className='authorName'>{ sourceName }</p>
      <p className='greyInfo'>{ authorName }</p>
    </span>
    <p>{ text }</p>
  </div>

export default SlideArticleQuote
