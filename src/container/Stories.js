import React, { Component } from 'react'
import './Stories.css'
import Previewsip from '../components/Previewsip.js'
import { actions } from '../store.js'


class Stories extends Component {
  componentDidMount() {
    fetch(`http://localhost:5000/sips`)
      .then(res => res.json())
      .then(actions.displaySips)
  }
  render() {

    return (
      <div className='Stories'>
        <h1>My sips</h1>
        <Previewsip
          title="Hello Title"
          slideIntro=""
          embed=""
          publicUrl="http://www.websip.com/1/publicurl3495"
          edit="http://localhost:5000/sips/"
          delete="http://localhost:5000/sips/"
        />
      </div>
    )
  }
}

export default Stories

