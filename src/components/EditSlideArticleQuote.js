import React from 'react'
import '../container/SlideDisplay.css'
import '../container/SipEditor.js'
import { Button } from 'semantic-ui-react'

const EditSlideArticleQuote = ({ slide, onChange, errors, onChangeArticleLink }) => {
  const { articleUrl, articleLink, sourceImage, sourceName, authorName, text, uid } = slide || {}
  const messageWarning = errors[`url-${uid}`]
    ? <p style={{margin: '0px', padding: '0px', color: 'red'}}>
      {errors[`url-${uid}`]} - Enter a good format to make any change in the slide
    </p>
    : ''
  const recoverUrlBtn = errors[`url-${uid}`]
    ? <Button onClick={onChangeArticleLink}>Recover the previous url</Button>
    : ''
  const readOnly = 'readOnly'
  const information = errors[`url-${uid}`]
    ? <span style={{margin: '0px', padding: '0px', color: 'red'}}>
      Please, enter a good url format to make any change in the slide
    </span>
    : ''

  return (
    <div className='__SlideDisplay'>
      <div className='EditArticle' style={{flexDirection: 'column'}}>
        <p style={{ marginBottom: '0px', padding: '0vh', fontWeight: 'bold' }}>
          Edit article link (<span style={{ color: 'red' }}>beware</span> : it will update the whole slide) :
          {recoverUrlBtn}
        </p>
        <input
          maxLength='500'
          placeholder={articleUrl}
          value={articleLink}
          type='url'
          onChange={event => onChange(event, 'articleLink')}
          required />
        {messageWarning}
        <div className='quote' style= {{justifyContent: 'center'}}>
          <span className='quoteHead'>
            <img src={sourceImage} alt='Article source icon' />
            <textarea
              className='authorName'
              {... (errors[`url-${uid}`] ? {readOnly} : '')}
              maxLength='120'
              rows='2'
              wrap='hard'
              placeholer={sourceName}
              value={sourceName || ''}
              onChange={event => onChange(event, 'sourceName')} />
            <textarea
              className='greyInfo'
              {... (errors[`url-${uid}`] ? {readOnly} : '')}
              maxLength='120'
              rows='2'
              wrap='hard'
              placeholer={authorName}
              value={authorName || ''}
              onChange={event => onChange(event, 'authorName')} />
          </span>
          <div className='EditText'>
            <textarea
              maxLength='300'
              {... (errors[`url-${uid}`] ? {readOnly} : '')}
              rows='4'
              wrap='hard'
              placeholer='Type your text here'
              value={text || ''}
              onChange={event => onChange(event, 'text')} />
              {information}
          </div>
        </div>
      </div>
    </div>
  )
}
export default EditSlideArticleQuote
