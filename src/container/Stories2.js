import React, { Component } from 'react'
import './Stories.css'
import Previewsip from '../components/Previewsip.js'
import { actions } from '../store.js'

class Stories extends Component {
  componentDidMount() {
    fetch(`http://localhost:5000/sips`)
      .then(sips => sips.json())
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
