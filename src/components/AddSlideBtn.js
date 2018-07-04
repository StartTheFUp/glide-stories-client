import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import './AddSlideBtn.css'
import 'semantic-ui-css/semantic.min.css'

const AddSlideBtn = props =>
  <div className='add-slide'>
    <Dropdown text='ADD A SLIDE' floating labeled button className='icon'>
      <Dropdown.Menu>
        <Dropdown.Header content='ADD A SLIDE' />
        <Dropdown.Item onClick={() => props.addSlide('intro')}>INTRO</Dropdown.Item>
        <Dropdown.Item onClick={() => props.addSlide('text')}>TEXT</Dropdown.Item>
        <Dropdown.Item onClick={() => props.addSlide('image')}>IMAGE + TEXT</Dropdown.Item>
        <Dropdown.Item onClick={() => props.showModal('tweet') }>TWEET</Dropdown.Item>
        <Dropdown.Item onClick={() => props.showModal('article')}>ARTICLE</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </div>

export default AddSlideBtn
