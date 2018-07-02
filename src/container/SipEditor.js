import React, { Fragment, Component } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { actions } from '../store.js'

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

const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult
  if (removedIndex === null && addedIndex === null) return arr

  const result = [...arr]
  let itemToAdd = payload

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0]
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd)
  }

  return result
}

class SipEditor extends Component {
  componentDidMount() {
    fetch(`http://localhost:5000/sips/${this.props.id}`)
      .then(res => res.json())
      .then(actions.loadSip)
  }

  saveChange = () => {
    if (this.prevSip === this.props.sip) return
    this.props.sip.slides
      .filter((slide, i) => slide !== this.prevSip.slides[i])
      .map(slide => {
        fetch(`http://localhost:5000/slides/${slide.id}`, {
        method : 'post',
        body : JSON.stringify(slide),
        headers : {'Content-Type': 'application/json'}
      })})
    this.prevSip = this.props.sip
  }

  onPrevious = () => {
    actions.handlePreviousSip()
  }

  onNext = () => {
    actions.handleNextSip()
  }

  componentDidUpdate(prevProps) {
    if (this.prevSip && this.prevSip.id === this.props.sip.id) {
      return
    }
    this.prevSip = this.props.sip
  }


  requestSave = (event, key) => {
    const { value, files } = event.target
    if (files) {
      const slide = this.props.sip.slides[this.props.currentStep]
      const body = new FormData()
      body.append('image', files[0])
      fetch(`http://localhost:5000/slide/${slide.type}/${slide.id}`, {
        method: 'POST',
        body
      })
        .then(res => res.json())
        .then(res => actions.updateSlide({ [key]: res.url }))
    } else {
      actions.updateSlide({ [key]: event.target.value })
      clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(this.saveChange, 2000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.intevalId)
  }

  render() {
    const { sip, currentStep } = this.props
    const slide = sip.slides[currentStep]

    if (!slide) return 'loading'
    return (
      <Fragment>
        <div className='__SlideEditor'>

          <div className='SlideBar'>
            <Container onDrop={e => actions.loadSip({ slides: applyDrag(sip.slides, e) })}>
              {sip.slides
                .map(slide => {
                  return (
                    <Draggable key={slide.uid}>
                      <div className='SlideMiniature draggable-item'>
                        {slideComponents[slide.type](slide)}
                      </div>
                    </Draggable>
                  )
                })
              }
            </Container>
          </div>

          <div className='Editor'>
            <div className='EditorScreen'>
              {EditSlideComponents[slide.type]({ slide, onChange: this.requestSave })}
            </div>

            <div className='EditorNavigation'>
              <button onClick={this.onPrevious}>Previous</button>
              <button onClick={this.onNext}>Next</button>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}
export default SipEditor
