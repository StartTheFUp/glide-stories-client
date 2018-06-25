import React, { Component } from 'react'
import SlideText from '../components/SlideText'
import SlideIntro from '../components/SlideIntro'
import SlideImage from '../components/SlideImage'
import SlideCallToAction from '../components/SlideCallToAction'
import SlideTweet from '../components/SlideTweet'
import SlideArticleQuote from '../components/SlideArticleQuote'
import { actions } from '../store.js'
import './SlideDisplay.css'

const slideComponents = {
  text: SlideText,
  intro: SlideIntro,
  image: SlideImage,
  callToAction: SlideCallToAction,
  tweet: SlideTweet,
  article: SlideArticleQuote
}

class SlideDisplay extends Component {
  componentDidMount() {
    fetch(`http://localhost:5000/sips/${this.props.id}`)
      .then(res => res.json())
      .then(actions.loadSip)
  }
  render() {
    const { sip, currentStep } = this.props
    const slide = sip.slides[currentStep]
    if (!slide) return 'loading'
    return (
      <div className='__SlideDisplay'>
        <div className='previousBtn' onClick={actions.handlePreviousSip}></div>
        <div className='nextBtn' onClick={actions.handleNextSip}></div>
        {slideComponents[slide.type](slide)}
      </div>
    )
  }
}

export default SlideDisplay
