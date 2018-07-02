import React from 'react'
import '../container/SlideDisplay.css'
import './SlideIntro.css'
import '../container/SipEditor.js'

const EditSlideIntro = ({ slide, onChange }) => {
  const { imageUrl, title, subtitle } = slide || {}
  return (
    <div className='__SlideDisplay'>
      <div className='SlideIntro' style={{backgroundImage: `url("${imageUrl}")`}}>
        <div>
          <input style={{flexGrow: 0.5}} type='file' onChange={event => onChange(event, 'imageUrl')}/>
          <h1><textarea
            maxLength='60'
            rows='2'
            wrap='hard'
            value={title}
            onChange={event => onChange(event, 'title')} /></h1>
          <h2 style={{flex: 0.7}}><textarea
            maxLength='250'
            rows='2'
            wrap='hard'
            value={subtitle}
            onChange={event => onChange(event, 'subtitle')} /></h2>
        </div>
      </div>
    </div>
  )
}
export default EditSlideIntro
