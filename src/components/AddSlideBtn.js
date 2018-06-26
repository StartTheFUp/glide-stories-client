import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'
import './AddSlideBtn.css'

class DropdownExampleHeader extends Component {
  render() {
    return (
      <div className='add-slide'>
        <Dropdown text='ADD A SLIDE' icon={this.props.iconType} floating labeled button className='icon'>
          <Dropdown.Menu>
            <Dropdown.Header content='ADD A SLIDE' />
            <Dropdown.Item onClick={() => this.props.addSlide('intro', this.props.id)}>INTRO</Dropdown.Item>
            <Dropdown.Item onClick={() => this.props.addSlide('text', this.props.id)}>TEXT</Dropdown.Item>
            <Dropdown.Item onClick={() => this.props.addSlide('image', this.props.id)}>IMAGE + TEXT</Dropdown.Item>
            <Dropdown.Item onClick={() => this.props.addSlide('tweet', this.props.id)}>TWEET</Dropdown.Item>
            <Dropdown.Item onClick={() => this.props.addSlide('article', this.props.id)}>ARTICLE</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    )
  }
}

export default DropdownExampleHeader
