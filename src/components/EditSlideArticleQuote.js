import React from 'react'
import '../container/SlideDisplay.css'
import '../container/SipEditor.js'
import { formatedDate } from '../formatedDate.js'

const EditSlideArticleQuote = ({ slide, onChange }) => {
  const { sourceImage, sourceName, authorName, text, publicationDate } = slide || {}
  console.log(slide)
  return (
    <div className='__SlideDisplay'>
      <div className='EditArticle' style={{flexDirection: 'column'}}>
        <div className='quote' style= {{justifyContent: 'center'}}>
          <span className='quoteHead'>
            <img src={sourceImage} alt='Article source icon' />
            <textarea
              className='authorName'
              maxLength='120'
              rows='2'
              wrap='hard'
              placeholer={sourceName}
              value={sourceName}
              onChange={event => onChange(event, 'sourceName')} />
            <textarea
              className='greyInfo'
              maxLength='120'
              rows='2'
              wrap='hard'
              placeholer={authorName}
              value={authorName}
              onChange={event => onChange(event, 'authorName')} />
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
          <p className='greyInfo'>{formatedDate(publicationDate)}</p>
        </div>
      </div>
    </div>
  )
}
export default EditSlideArticleQuote
