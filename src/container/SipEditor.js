import React, { Component } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { actions } from '../store.js'
import { sendUpdatedSipOrder, sendNewSlide, getSipBySipId, sendUpdatedSlide, sendNewImage } from '../api.js'

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
import AddSlideBtn from '../components/AddSlideBtn.js'
import ModalInputUrl from '../components/ModalInputUrl.js'

import './SipEditor.css'

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

const SlideMiniature = ({ slide, currentSlide }) =>
  <div className={`SlideMiniature draggable-item${
    slide === currentSlide ? ' selected' : ''
  }`}
  onClick={() => actions.handleSlideSelection(slide)}>
    {slideComponents[slide.type](slide)}
  </div>

const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult

  if (removedIndex === null && addedIndex === null) return arr

  const result = [...arr]
  let itemToAdd = payload

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex + 1, 1)[0]
  }

  if (addedIndex !== null) {
    result.splice(addedIndex + 1, 0, itemToAdd)
  }

  return result
}

const style = {
  slide: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

class SipEditor extends Component {
  componentDidMount() {
    getSipBySipId(this.props.id)
      .then(actions.loadSip)
  }

  onDrop = e => {
    const slides = applyDrag(this.props.sip.slides, e)
    actions.loadSip({ slides })
    const sipOrder = slides
      .map(slide => slide.uid)
      .join(' ')

    sendUpdatedSipOrder(sipOrder, this.props.id)
  }

  saveChange = () => {
    if (this.prevSip === this.props.sip) return
    this.props.sip.slides
      .filter((slide, i) => slide !== this.prevSip.slides[i])
      .map(slide => sendUpdatedSlide(slide))
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
    const { value, files } = event.target // value argument deleted (lint)
    if (files) {
      const slide = this.props.sip.slides[this.props.currentStep]
      const body = new FormData()
      body.append('image', files[0])
      sendNewImage(slide, body)
        .then(res => actions.updateSlide({ [key]: res.url }))
    } else {
      actions.updateSlide({ [key]: value })
      clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(this.saveChange, 2000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.intevalId)
  }

  render() {
    const { sip, currentStep } = this.props
    const currentSlide = sip.slides[currentStep]

    if (!currentSlide) return 'loading'
    return (
      <div className='__SlideEditor'>
        <div className='SlideBar'>
          <div>
            {SlideMiniature({ slide: sip.slides[0], currentSlide })}
          </div>
          <Container onDrop={this.onDrop}>
            {sip.slides.slice(1).map(slide =>
              <Draggable key={slide.uid}>
                {SlideMiniature({ slide, currentSlide })}
              </Draggable>)}
          </Container>
        </div>
        <div className='Editor'>
          <div className='EditorScreen'>
            {EditSlideComponents[currentSlide.type]({
              slide: currentSlide,
              onChange: this.requestSave
            })}
          </div>

          <div className='EditorNavigation'>
            <button onClick={this.onPrevious}>Previous</button>
            <button onClick={this.onNext}>Next</button>
          </div>

          <AddSlideBtn addSlide={sendNewSlide} id={this.props.id} style={style.btnDropDown}/>
          <ModalInputUrl
            onClose={actions.closeModal}
            onChange={e => actions.updateUrl(e.target.value)}
            onSubmit={() => actions.addSlide(this.props.type)}
            open={this.props.modalState}
            url={this.props.inputValue}
            type={this.props.type} />
        </div>
      </div>
    )
  }
}

export default SipEditor
