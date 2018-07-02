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

  render() {
    const { sip, currentStep } = this.props
    const slide = sip.slides[currentStep]

    if (!slide) return 'loading'
    return (
      <Fragment>
        <div className='__SlideEditor'>

          <div className='SlideBar'>
              {sip.slides
                .map(slide => {
                  return (
                    <Draggable key={slide.uid}>
                      <div className='SlideMiniature draggable-item'>
                        {slideComponents[slide.type](slide)}
                      </div>
                    </Draggable>
                  )
            <Container onDrop={this.onDrop}>
                })
              }
            </Container>
          </div>

          <div className='Editor'>
            <div className='EditorScreen'>
              {EditSlideComponents[slide.type] && EditSlideComponents[slide.type]({
                slide,
                onChange: (event, key) => actions.updateSlide({ [key]: event.target.value })
              })}
            </div>

            <div className='EditorNavigation'>
              <button onClick={actions.handlePreviousSip}>Previous</button>
              <button onClick={actions.handleNextSip}>Next</button>

            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default SipEditor
