import React from 'react'
import '../container/SlideDisplay.css'
import '../container/SipEditor.js'
import './SlideIntro.css'

const EditSlideCallToAction = ({ slide, onChange, errors }) => {
  const { imageUrl, title, subtitle, btnLink, btnText } = slide || {}
  return (
    <div className='__SlideDisplay'>
      <div className='SlideIntro' style={{backgroundImage: `url("${imageUrl}")`}}>
        <div>
          <div className='errors'>
            {errors.upload ? errors.upload : ''}
          </div>
          <div className='uploadImageInput' >
            <label htmlFor='image_uploads'>Sélectionnez une image (PNG, JPG)</label>
            <input style={{flexGrow: 0.5}} type='file' onChange={event => onChange(event, 'imageUrl')}/>
          </div>
          <h1><textarea
            maxLength='60'
            rows='2'
            wrap='hard'
            value={title || ''}
            onChange={event => onChange(event, 'title')} /></h1>
          <h2 style={{flex: 0.7}}><textarea
            maxLength='250'
            rows='2'
            wrap='hard'
            value={subtitle || ''}
            onChange={event => onChange(event, 'subtitle')} /></h2>
          <textarea
            className='editButton'
            maxLength='30'
            rows='1'
            wrap='hard'
            value={btnText || ''}
            placeholder='Edit the button text'
            onChange={event => onChange(event, 'btnText')} />
          <p style={{ marginBottom: '0px', padding: '0vh', fontWeight: 'bold' }}>Button's link :</p>
          <input
            maxLength='500'
            value={btnLink || ''}
            onChange={event => onChange(event, 'btnLink')} />
        </div>
      </div>
    </div>
  )
}
export default EditSlideCallToAction
