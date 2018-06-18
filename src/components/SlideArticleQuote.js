import React from 'react'
import './SlideScrapping.css'

const SlideArticleQuote = ({source, authorName, text}) =>
  <div className='quote'>
    <span className='quoteHead'>
      <p className='authorName'>{ source }</p>
      <p className='greyInfo'>{ authorName }</p>
    </span>
    <p>{ text }</p>
  </div>

export default SlideArticleQuote
