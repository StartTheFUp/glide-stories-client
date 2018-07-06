import React from 'react'
import { navigate } from '@reach/router'
import 'semantic-ui-css/semantic.min.css'
import { Dropdown, Button } from 'semantic-ui-react'
import './AddSlideBtn.css'

const AddSlideBtn = props =>
  <div className='add-slide'>
    <Button.Group color='violet'>
      <Dropdown text='ADD A SLIDE' icon={props.icon} floating labeled button className='icon'>
        <Dropdown.Menu>
          <Dropdown.Header content='ADD A SLIDE' />
          <Dropdown.Item onClick={() => props.addSlide('intro')}>INTRO</Dropdown.Item>
          <Dropdown.Item onClick={() => props.addSlide('text')}>TEXT</Dropdown.Item>
          <Dropdown.Item onClick={() => props.addSlide('image')}>IMAGE + TEXT</Dropdown.Item>
          <Dropdown.Item onClick={() => props.addSlide('callToAction')}>CALL TO ACTION</Dropdown.Item>
          <Dropdown.Item onClick={() => navigate(`/edit/${props.id}/tweet`)}>TWEET</Dropdown.Item>
          <Dropdown.Item onClick={() => navigate(`/edit/${props.id}/article`)}>ARTICLE</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Button.Group>
  </div>

export default AddSlideBtn
