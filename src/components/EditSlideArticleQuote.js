import React from 'react'
import './EditSlideArticleQuote.css'
import '../container/SlideDisplay.css'
import '../container/SipEditor.js'

const EditSlideArticleQuote = ({ slide, onChange }) => {
  const { articleUrl, sourceImage, sourceName, authorName, text, publicationDate } = slide || {}
  return (
    <div className='__SlideDisplay'>
      <div className='EditArticle' style={{flexDirection: 'column'}}>
        <input
          maxLength='500'
          value={articleUrl}
          onChange={event => onChange(event, 'articleUrl')} />
        <div className='quote' style= {{justifyContent: 'center'}}>
          <span className='quoteHead'>
            <img src={sourceImage} alt='Article source icon' />
            <p className='authorName'>{sourceName}</p>
            <p className='greyInfo'>{authorName}</p>
          </span>
          <div className='EditText'>
            <textarea
              maxLength='300'
              rows='4'
              wrap='hard'
              placeholer='Type your text here'
              value={slide && text}
              onChange={event => onChange(event, 'text')} />
          </div>
          <p className='greyInfo'>{publicationDate}</p>
        </div>
      </div>
    </div>
  )
}
export default EditSlideArticleQuote
