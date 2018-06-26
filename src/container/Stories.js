import React, { Component } from 'react'
import './Stories.css'
import Previewsip from '../components/Previewsip.js'
// import { actions } from '../store.js'

class Stories extends Component {
  componentDidMount() {
    // fetch(`http://localhost:5000/sips/}`)
    //   .then(res => res.json())
  }
  render() {
    return (
      <div className='Stories'>
        <h1>My stories</h1>
        <Previewsip
          title="Hello je suis un titre"
          slideIntro="JE SUIS UNE SLIDE INTRO"
          embed="je suis un faux embed je me glisse dans ton site et fais des sips"
          publicUrl="http://www.websip.com/1/publicurl3495"
          edit="http://localhost:5000/sips/"
          delete="http://localhost:5000/sips/"
        />
      </div>
    )
  }
}

export default Stories

