import React from 'react'
import { navigate } from '@reach/router'
import { actions } from '../store.js'
import 'semantic-ui-css/semantic.min.css'
import { Dropdown } from 'semantic-ui-react'
import './AddSlideBtn.css'

const tweet = () => actions.tweetType()
const article = () => actions.articleType()

const AddSlideBtn = props =>
  <div className='add-slide'>
    <Dropdown text='ADD A SLIDE' icon={props.icon} floating labeled button className='icon'>
      <Dropdown.Menu>
        <Dropdown.Header content='ADD A SLIDE' />
        <Dropdown.Item onClick={() => props.addSlide('intro')}>INTRO</Dropdown.Item>
        <Dropdown.Item onClick={() => props.addSlide('text')}>TEXT</Dropdown.Item>
        <Dropdown.Item onClick={() => props.addSlide('image')}>IMAGE + TEXT</Dropdown.Item>
        <Dropdown.Item onClick={() => props.addSlide('callToAction')}>CALL TO ACTION</Dropdown.Item>
        <Dropdown.Item onClick={() => { navigate(`/edit/${props.id}/url`); tweet() }}>TWEET</Dropdown.Item>
        <Dropdown.Item onClick={() => { navigate(`/edit/${props.id}/url`); article() }}>ARTICLE</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </div>

export default AddSlideBtn
