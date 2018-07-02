import React, { Component } from 'react'
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
import AddSlideBtn from '../components/AddSlideBtn.js'
import ModalInputUrl from '../components/Modal.js'

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

const SlideMiniature = ({ slide, currentSlide }) =>
  <div className={`SlideMiniature draggable-item${
    slide === currentSlide ? ' selected' : ''
  }`}
    onClick={() => actions.handleSlideSelection(slide)}>
    {slideComponents[slide.type](slide)}
  </div>

const updateSipOrder = (order, id) =>
  fetch(`http://localhost:5000/sips/${id}`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ order })
  })
    .then(res => res.json())

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

const addNewSlide = (type, sipId, url) => {
  return fetch('http://localhost:5000/slides', {
    method: 'POST',
    body: JSON.stringify({type, sipId, url}),
    headers: { 'content-type': 'application/json' }
  })
    .then(console.log(type, sipId, url))
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
    fetch(`http://localhost:5000/sips/${this.props.id}`)
      .then(res => res.json())
      .then(actions.loadSip)
  }

  onDrop = e => {
    const slides = applyDrag(this.props.sip.slides, e)
    actions.loadSip({ slides })
    const sipOrder = slides
      .map(slide => slide.uid)
      .join(' ')

    updateSipOrder(sipOrder, this.props.id)
  }

  saveChange = () => {
    if (this.prevSip === this.props.sip) return
    this.props.sip.slides
      .filter((slide, i) => slide !== this.prevSip.slides[i])
      .map(slide => {
        return fetch(`http://localhost:5000/slides/${slide.id}`, {
          method: 'post',
          body: JSON.stringify(slide),
          headers: {'Content-Type': 'application/json'}
        })
      })
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
    const { files } = event.target // value argument deleted (lint)
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
    const currentSlide = sip.slides[currentStep]

    if (!currentSlide) return 'loading'
    return (
      <div className='__SlideEditor'>
        <div className='SlideBar'>
          <Container onDrop={this.onDrop}>
            {
              sip.slides.map(slide => {
                if (slide === sip.slides[currentStep]) {
                  return (
                    <Draggable key={slide.uid}>
                      <div className='SlideMiniature draggable-item selected'
                        onClick={() => actions.handleSlideSelection(slide)}>
                        {slideComponents[slide.type](slide)}
                      </div>
                    </Draggable>
                  )
                } else {
                  return (
                    <Draggable key={slide.uid}>
                      <div className='SlideMiniature draggable-item'
                        onClick={() => actions.handleSlideSelection(slide)}>
                        {slideComponents[slide.type](slide)}
                      </div>
                    </Draggable>
                  )
                }
              })
            }
          </Container>
        </div>
        <div className='Editor'>
          <div className='EditorScreen'>
            {EditSlideComponents[currentSlide.type]({
              slide: currentSlide,
              onChange: (event, key) => actions.updateSlide({ [key]: event.target.value })
            })}
          </div>
          <div className='EditorNavigation'>
            <button onClick={this.onPrevious}>Previous</button>
            <button onClick={this.onNext}>Next</button>
          </div>

          <AddSlideBtn addSlide={addNewSlide} id={this.props.id} style={style.btnDropDown}/>
          <ModalInputUrl
            addSlide={addNewSlide}
            id={this.props.id}
            url={this.props.inputValue}
            type={this.props.type}
            modalState={this.props.modalState} />
        </div>
      </div>
    )
  }
}

export default SipEditor
