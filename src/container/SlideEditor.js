import React, { Fragment, Component } from 'react'
import EditSlideText from '../components/EditSlideText'
import { actions } from '../store.js'

class SlideEditor extends Component {
  componentDidMount() {
    fetch(`http://localhost:5000/sips/${this.props.id}`)
      .then(res => res.json())
      .then(sip => actions.updateSlide(sip.slide[0]))
  }
  render() {
    return (
      <Fragment>
        <EditSlideText onChange={event => actions.updateSlide({ text: event.target.value })} />
      </Fragment>
    )
  }
}
export default SlideEditor
