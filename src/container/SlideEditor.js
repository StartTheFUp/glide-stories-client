import React, { Fragment, Component } from 'react'
import EditSlideText from '../components/EditSlideText'
import { actions } from '../store.js'

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
