import React, { Component } from 'react'
import './Stories.css'
import Previewsip from '../components/Previewsip.js'
import { actions } from '../store.js'

class Stories extends Component {
  componentDidMount() {
    fetch(`http://localhost:5000/preview`)
      .then(sips => sips.json())
      .then(actions.loadSips)
  }

  render() {
    const mysips = this.props.sips.map(mysip =>
      <Previewsip
        key={mysip.id}
        title={mysip.sipsTitle}
        slideIntroTitle={mysip.title}
        slideIntroSubtitle={mysip.subtitle}
        SlideIntroImage={mysip.image_url}
        embed='je suis un morceau de code'
        publicUrl='http://websips.com/view/453789' />)
    return (
      <div className="ui grid container">
        <h1>My sips</h1>
        <div className="ui stackable four column grid">
          {mysips}
        </div>
      </div>

    )
  }
}

export default Stories
