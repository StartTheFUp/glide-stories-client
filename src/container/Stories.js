import React, { Component } from 'react'
import './Stories.css'
import Previewsip from '../components/Previewsip.js'
import { actions } from '../store.js'

class Stories extends Component {
  componentDidMount() {
    fetch(`http://localhost:5001/sips`)
      .then(sips => sips.json())
      .then(actions.loadSips)
  }

  render() {
    console.log(this.props.sip.slides[0])

    const mysips = this.props.sips.map(mysip =>
      <Previewsip
        key={mysip.id}
        title={mysip.title}
        slideIntro='rien'
        embed='je suis un morceau de code'
        publicUrl='http://websips.com/view/453789' />)
    return (
      <div className='Stories'>
        <h1>My sips</h1>
        <div className="SipContainer">
          {mysips}
        </div>
      </div>
    )
  }
}

export default Stories
