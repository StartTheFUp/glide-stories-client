import React, { Fragment, Component } from 'react'
import SlideText from '../components/SlideText'
import SlideIntro from '../components/SlideIntro'
import SlideImage from '../components/SlideImage'
import SlideCallToAction from '../components/SlideCallToAction'
import SlideTweet from '../components/SlideTweet'
import SlideArticleQuote from '../components/SlideArticleQuote'
import EditSlideText from '../components/EditSlideText'
import { actions } from '../store.js'

const slideComponents = {
  text: SlideText,
  intro: SlideIntro,
  image: SlideImage,
  callToAction: SlideCallToAction,
  tweet: SlideTweet,
  article: SlideArticleQuote
}

class SlideEditor extends Component {
  componentDidMount() {
    fetch(`http://localhost:5000/sips/${this.props.id}`)
      .then(res => res.json())
      .then(actions.loadSip)
      .then(() => actions.handleNextSip())
  }
  // dans le store utiliser le
  render() {
    console.log(this.props, this.props.sip.slides[this.props.currentStep])
    return (
      <Fragment>
        <EditSlideText
          slide={this.props.sip.slides[this.props.currentStep]}
          onChange={(event, key) => actions.updateSlide({ [key]: event.target.value })} />
      </Fragment>
    )
  }
}
export default SlideEditor
