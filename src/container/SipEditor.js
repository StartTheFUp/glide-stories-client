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
      // .then(() => actions.handleNextSip())
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
              {EditSlideComponents[slide.type] && EditSlideComponents[slide.type]({
                slide,
                onChange: (event, key) => actions.updateSlide({ [key]: event.target.value })
              })}
            </div>

            <div className='EditorNavigation'>
              <button onClick={actions.handlePreviousSip}>Previous</button>
              <button onClick={actions.handleNextSip}>Next</button>

            </div>
            
            <AddSlideBtn addSlide={addNewSlide} id={this.props.id} style={style.btnDropDown}/>
            <ModalInputUrl
              addSlide={addNewSlide}
              id={this.props.id}
              url={this.props.inputValue}
              type={this.props.type}
              modalState={this.props.modalState}/>
          </div>
        </div>
      </Fragment>
    )
  }
}
export default SipEditor
