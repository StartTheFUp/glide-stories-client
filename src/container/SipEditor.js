import React, { Component } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { actions } from '../store.js'
import { sendUpdatedSlide, getSipBySipId, sendNewImage } from '../api.js'

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
import Navbar from '../components/Navbar.js'
import { navigate } from '@reach/router'

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

const SlideMiniature = ({ slide, currentSlide }) => (
  <div
    className={`SlideMiniature draggable-item${
      slide === currentSlide ? ' selected' : ''
    }`}
    onClick={() => actions.handleSlideSelection(slide)}
  >
    {slideComponents[slide.type](slide)}
  </div>
)

class SipEditor extends Component {
  componentDidMount() {
    getSipBySipId(this.props.id).then(actions.loadSip)
  }

  onDrop = e => {
    actions.applyDrag(e)
  }

  saveChange = () => {
    if (this.prevSip === this.props.sip) return
    this.props.sip.slides
      .filter((slide, i) => slide !== this.prevSip.slides[i])
      .map(sendUpdatedSlide)
    this.prevSip = this.props.sip
  }

  onPrevious = () => {
    actions.handlePreviousSlide()
  }

  onNext = () => {
    actions.handleNextSlide()
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
      sendNewImage(slide, body).then(res =>
        actions.updateSlide({ [key]: res.url })
      )
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
      <div className='ContainerEditor'>
        <Navbar className='navbarContainer'/>
        <div className='Editor'>
          <div className='ContainerEditor'>
            <div className='button'>
              <AddSlideBtn
                addSlide={actions.addSlide}
                id={this.props.id}
                icon='plus' />
            </div>
            <div className='SlideBar'>
              <div>
                {SlideMiniature({ slide: sip.slides[0], currentSlide })}
              </div>
              <Container onDrop={this.onDrop}>
                {sip.slides
                  .slice(1)
                  .map(slide => (
                    <Draggable key={slide.uid}>
                      {SlideMiniature({ slide, currentSlide })}
                    </Draggable>
                  ))}
              </Container>
            </div>
          </div>
          <div className="__SlideEditor">
            <button className="ui icon button navigationBtn" onClick={this.onPrevious}>
              <i className="angle left icon"></i>
            </button>
            <div className='EditorScreen'>
              {EditSlideComponents[currentSlide.type]({
                slide: currentSlide,
                onChange: this.requestSave
              })}
            </div>
            <ModalInputUrl
              open= {this.props.insertUrl}
              onClose={() => navigate(`/edit/${sip.id}`)}
              onChange={e => actions.updateUrl(e.target.value)}
              // onSubmit={() => actions.addSlide(this.props.type)}
              onSubmit={() => actions.addSlide(this.props.type)}
              url={this.props.inputValue}
              type={this.props.type}
            />
            <button className="ui icon button navigationBtn" onClick={this.onNext}>
              <i className="angle right icon"></i>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default SipEditor
