import React, { Component } from 'react'
import './Stories.css'
import Previewglide from '../components/Previewglide.js'
import { actions } from '../store.js'
import { getAllGlides } from '../api.js'

class Stories extends Component {
  componentDidMount() {
    getAllGlides()
      .then(actions.loadGlides)
  }

  render() {
    const myglides = this.props.glides.map(myglide =>
      <Previewglide
        key={myglide.id}
        title={myglide.title}
        slideIntro={this.props..slides[0]} />)
    return (

      <div className='Stories'>
        <h1>My glides</h1>
        {myglides}
      </div>
    )
  }
}

export default Stories
