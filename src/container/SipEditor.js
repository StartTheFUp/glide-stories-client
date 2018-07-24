import React, { Component } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { actions } from '../store.js'
import { sendUpdatedSlide, getSipBySipId, sendNewImage } from '../api.js'
import { Redirect, navigate, Link } from '@reach/router'

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

import { Button, Modal, Header, Icon } from 'semantic-ui-react'

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

const SlideMiniature = ({ slide, currentSlide, index }) => (
  <div
    className={`SlideMiniature draggable-item${
      slide === currentSlide ? ' selected' : ''
    }`}
    onClick={() => actions.handleSlideSelection(slide)}
  >
    <div className='slidebarIndex'>{index}</div>
    <div>{slideComponents[slide.type](slide)}</div>

  </div>
)

class SipEditor extends Component {
  componentDidMount() {
    getSipBySipId(this.props.id).then(actions.loadSip)
  }

  saveChange = async () => {
    if (this.prevSip === this.props.sip) return
    this.props.sip.slides
      .filter((slide, i) => slide !== this.prevSip.slides[i])
      .forEach(async slide => {
        const { error, ...update } = await sendUpdatedSlide({
          ...slide,
          articleUrl: slide.articleLink
        })
        if (error) {
          if (error === "wrong url") {
            actions.showError(`url-${slide.uid}`, error)
          } else if (error === "Unabled to save data in database. Try again later.") {
            actions.showError('db', error)
          } else if (error) {
            actions.showError('server', 'Internal server error. Please try again.')
          }
        } else {
          actions.showError(`url-${slide.uid}`, undefined)
          actions.showError('db', undefined)
          actions.showError('server', undefined)
          actions.updateSlide({ ...slide, ...update })
        }
      })

    this.prevSip = this.props.sip
  }

  componentDidUpdate(prevProps) {
    if (this.prevSip && this.prevSip.id === this.props.sip.id) {
      return
    }
    this.prevSip = this.props.sip
  }

  requestSave = async (event, key) => {
    const { value, files } = event.target // value argument deleted (lint)
    if (files) {
      const slide = this.props.sip.slides[this.props.currentStep]
      const body = new FormData()
      body.append('image', files[0])
      const { error, url } = await sendNewImage(slide, body)
      if (error) {
        actions.showError('upload', error)
      } else {
        actions.showError('upload', undefined)
        actions.updateSlide({ [key]: url })
      }
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
    if (!localStorage.token) return <Redirect noThrow to='/' />
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
              <div style={{ position: 'relative' }}>
                {SlideMiniature({ slide: sip.slides[0], currentSlide, index: 1 })}
              </div>
              <Container onDrop={actions.applyDrag}>
                {sip.slides
                  .slice(1)
                  .map(slide => (
                    <Draggable key={slide.uid}>
                      {SlideMiniature({ slide, currentSlide, index: sip.slides.indexOf(slide) + 1 })}
                    </Draggable>
                  ))}
              </Container>
            </div>
          </div>
          <div className="__SlideEditor">
            <button className="ui icon button navigationBtn" onClick={actions.handlePreviousSlide}>
              <i className="angle left icon"></i>
            </button>
            <div className='EditorScreen'>
              {EditSlideComponents[currentSlide.type]({
                slide: currentSlide,
                onChange: this.requestSave,
                errors: this.props.errors,
                onChangeArticleLink: () => actions.updateSlide({ articleLink: currentSlide.articleUrl }) && actions.showError(`url-${currentSlide.uid}`, undefined)
              })}
            </div>
            <ModalInputUrl
              open={this.props.insertUrl}
              onClose={() => navigate(`/edit/${sip.id}`)}
              onChange={e => actions.updateUrl(e.target.value)}
              onSubmit={() => actions.addSlide(this.props.type)}
              url={this.props.inputValue}
              type={this.props.type}
            />
            <button className="ui icon button navigationBtn" onClick={actions.handleNextSlide}>
              <i className="angle right icon"></i>
            </button>
            <div className='actions'>
              <a href={`/${sip.id}`} target="_blank">
                <Button color='teal' fluid size='large'><Icon name='eye' />Preview Sip</Button>
              </a>
              {currentStep !== 0 && (
                <React.Fragment>
                  <Link to={`/edit/${sip.id}/remove`}>
                    <Button inverted color='red' fluid size='large'><Icon name='archive' />Delete Slide</Button>
                  </Link>
                  <Modal open={this.props.remove} basic size='small' onClose={() => navigate(`/edit/${sip.id}`)}>

                    <Header icon='archive' content='Are you sure you want to delete this slide ?' />
                    <Modal.Content>
                      <p>
                            This is forever dude, becarefull, we won't care if you cry later...
                        <br />
                            Please, think twice, we can talk about it...
                      </p>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button basic inverted onClick={() => navigate(`/edit/${sip.id}`)}>
                        <Icon name='remove' /> Cancel
                      </Button>
                      <Button inverted
                        color='red'
                        onClick={e => {
                          actions.deleteSlide(currentSlide)
                          navigate(`/edit/${sip.id}`)
                        }}>
                        <Icon name='checkmark' /> Confirm Delete Slide
                      </Button>
                    </Modal.Actions>
                  </Modal>
                </React.Fragment>
              )}
              {/* handle server errors*/ }
              {this.props.errors.db || this.props.errors.server
                ? this.props.errors.db || this.props.errors.server
                : ''}
            </div>
            <div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SipEditor
