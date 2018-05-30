import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import SlideText from '../components/SlideText'
import SlideDisplay from '../container/SlideDisplay'

storiesOf('SlideDisplay', module)
  .add('show a text slide', () =>
    <SlideDisplay
      handleNext={action('Load next slide')}
      handlePrevious={action('Load previous slide')}
      slide={{
        type: 'text',
        text: 'Slide Text Example'
      }}
    />)

storiesOf('SlideText', module)
  .add('show verticaly centred text property', () =>
    <SlideText text={'hey hey heyyyyyyy'} />)
  .add('show emoji', () =>
    <SlideText text={<span role="img" aria-label="great job">
        ⭐👏⭐👏⭐👏⭐👏
    </span>} />)
