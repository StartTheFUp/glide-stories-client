import React, { Component } from 'react'
import SlideText from '../components/SlideText'
import SlideIntro from '../components/SlideIntro'
import SlideImage from '../components/SlideImage'
import SlideCallToAction from '../components/SlideCallToAction'
import SlideTweet from '../components/SlideTweet'
import SlideArticleQuote from '../components/SlideArticleQuote'
import { actions } from '../store.js'
import { Line } from 'rc-progress'
import { getSipBySipId } from '../api.js'
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
    getSipBySipId(this.props.id).then(actions.loadSip)
  }
  render() {
    const progressBarValue = (this.props.currentStep * 100) / (this.props.sip.slides.length - 1)
    const { sip, currentStep } = this.props
    const slide = sip.slides[currentStep]
    if (!slide) return 'loading'
    return (
      <div className='Container'>
        <div className='ContainerProgressBarAndSlide'>
          <div>
            <Line percent={progressBarValue} strokeWidth='1' strokeColor='pink' fill-opacity='0.1'/>
          </div>
          <div className='__SlideDisplay'>
            <div className='previousBtn' onClick={actions.handlePreviousSlide} />
            <div className='nextBtn' onClick={actions.handleNextSlide} />
            {slideComponents[slide.type](slide)}
          </div>
        </div>
      </div>
    )
  }
}

export default SlideDisplay
