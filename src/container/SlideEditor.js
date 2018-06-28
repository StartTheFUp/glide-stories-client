import React, { Component } from 'react'
import EditSlideText from '../components/EditSlideText'
import { actions } from '../store.js'
import AddSlideBtn from '../components/AddSlideBtn.js'
import ModalInputUrl from '../components/Modal.js'

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

class SlideEditor extends Component {
  componentDidMount() {
    fetch(`http://localhost:5000/sips/${this.props.id}`)
      .then(res => res.json())
      .then(actions.loadSip)
      .then(() => actions.handleNextSip())
  }

  render() {
    return (
      <div style={style.slide}>
        <EditSlideText
          slide={this.props.sip.slides[this.props.currentStep]}
          onChange={(event, key) => actions.updateSlide({ [key]: event.target.value })} />
        <AddSlideBtn addSlide={addNewSlide} id={this.props.id} style={style.btnDropDown}/>
        <ModalInputUrl
          addSlide={addNewSlide}
          id={this.props.id}
          url={this.props.articleUrlValue}
          type={this.props.type}
          modalState={this.props.modalState}/>
      </div>
    )
  }
}
export default SlideEditor
