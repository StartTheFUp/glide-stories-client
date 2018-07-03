import React, { Component } from 'react'
import './Stories.css'
import Previewsip from '../components/Previewsip.js'
import { actions } from '../store.js'
import { getAllSips } from '../api.js'


class Stories extends Component {
  componentDidMount() {
    getAllSips()
      .then(actions.loadSips)
  }

  render() {
    const mysips = this.props.sips.map(mysip =>
      <Previewsip
        key={mysip.id}
        title={mysip.title}
        slideIntro={this.props.sip.slides[0]} />)
    return (

      <div className='Stories'>
        <h1>My sips</h1>
        {mysips}
      </div>
    )
  }
}

export default Stories
