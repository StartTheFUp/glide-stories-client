import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import './AddSlideBtn.css'
import 'semantic-ui-css/semantic.min.css'
import { actions } from '../store.js'

const Dropdownbtn = (props) =>
  <div className='add-slide'>
    <Dropdown text='ADD A SLIDE' icon={props.icon} floating labeled button className='icon'>
      <Dropdown.Menu>
        <Dropdown.Header content='ADD A SLIDE' />
        <Dropdown.Item onClick={() => props.addSlide('intro', props.id)}>INTRO</Dropdown.Item>
        <Dropdown.Item onClick={() => props.addSlide('text', props.id)}>TEXT</Dropdown.Item>
        <Dropdown.Item onClick={() => props.addSlide('image', props.id)}>IMAGE + TEXT</Dropdown.Item>
        <Dropdown.Item onClick={() => actions.showModal('tweet') }>TWEET</Dropdown.Item>
        <Dropdown.Item onClick={() => actions.showModal('article')}>ARTICLE</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </div>

export default Dropdownbtn
