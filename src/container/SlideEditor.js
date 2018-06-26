import React, { Fragment, Component } from 'react'
import SlideText from '../components/SlideText'
import SlideIntro from '../components/SlideIntro'
import SlideImage from '../components/SlideImage'
import SlideCallToAction from '../components/SlideCallToAction'
import SlideTweet from '../components/SlideTweet'
import SlideArticleQuote from '../components/SlideArticleQuote'
import EditSlideText from '../components/EditSlideText'
import EditSlideIntro from '../components/EditSlideIntro'
import EditSlideImage from '../components/EditSlideImage'
import EditSlideCallToAction from '../components/EditSlideCallToAction'
import EditSlideTweet from '../components/EditSlideTweet'
import EditSlideArticleQuote from '../components/EditSlideArticleQuote'

import './SlideEditor.css'
import { actions } from '../store.js'

const slideComponents = {
  text: SlideText,
  intro: SlideIntro,
  image: SlideImage,
  callToAction: SlideCallToAction,
  tweet: SlideTweet,
  article: SlideArticleQuote
}

const EditSlideComponents = {
  text: EditSlideText,
  intro: EditSlideIntro,
  image: EditSlideImage,
  callToAction: EditSlideCallToAction,
  tweet: EditSlideTweet,
  article: EditSlideArticleQuote
}

class SlideEditor extends Component {
  componentDidMount() {
    fetch(`http://localhost:5000/sips/${this.props.id}`)
      .then(res => res.json())
      .then(actions.loadSip)
      .then(() => actions.handleNextSip())
  }
  render() {
    console.log('heyhey', this.props, this.props.sip.slides[this.props.currentStep])
    const { sip, currentStep } = this.props
    const slide = sip.slides[currentStep]
    if (!slide) return 'loading'
    return (
      <Fragment>
        <div className='SlideBar'>
          {sip.slides
            .map(slide => <div className='SlideMiniature'>{slideComponents[slide.type](slide)}</div>)
            .slice(0, 10)
          }
        </div>
        {EditSlideComponents[slide.type] && EditSlideComponents[slide.type]({
          slide,
          onChange: (event, key) => actions.updateSlide({ [key]: event.target.value })
        })}
        <button onClick={actions.handlePreviousSip}>Previous</button>
        <button onClick={actions.handleNextSip}>Next</button>
        {/* <EditSlideText
          slide={this.props.sip.slides[this.props.currentStep]}
          onChange={(event, key) => actions.updateSlide({ [key]: event.target.value })} />
        <EditSlideArticleQuote
          slide={this.props.sip.slides[this.props.currentStep]}
          onChange={(event, key) => actions.updateSlide({ [key]: event.target.value })} /> */}
      </Fragment>
    )
  }
}
export default SlideEditor
