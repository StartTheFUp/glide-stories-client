import React, { Fragment, Component } from 'react'
import EditSlideText from '../components/EditSlideText'
import { actions } from '../store.js'
import AddSlideBtn from '../components/AddSlideBtn.js'

class SlideEditor extends Component {
  componentDidMount() {
    fetch(`http://localhost:5000/sips/${this.props.id}`)
      .then(res => res.json())
      .then(actions.loadSip)
      .then(() => actions.handleNextSip())
  }

addNewSlide = (type, sipId) => {
  return fetch('http://localhost:5000/slides', {
    method: 'POST',
    body: JSON.stringify({type, sipId}),
    headers: {'content-type' : 'application/json'}
  })
}

render() {
  // console.log(this.props, this.props.sip.slides[this.props.currentStep])
  return (
    <Fragment>
      <EditSlideText
        slide={this.props.sip.slides[this.props.currentStep]}
        onChange={(event, key) => actions.updateSlide({ [key]: event.target.value })} />
      <AddSlideBtn addSlide={this.addNewSlide} id={this.props.id}/>
    </Fragment>
  )
}
}
export default SlideEditor
