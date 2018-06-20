import React, { Fragment } from 'react'
import EditSlideText from '../components/EditSlideText'
import { actions } from '../store.js'

const SlideEditor = () =>
  <Fragment>
    <EditSlideText onChange={event => actions.updateSlide({ text: event.value })} />
  </Fragment>

export default SlideEditor
