import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import SlideText from '../components/SlideText'
import SlideDisplay from '../container/SlideDisplay'
import SlideIntro from '../components/SlideIntro'

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

storiesOf('SlideIntro', module)
  .add('show verticaly centred text property', () =>
    <SlideIntro image="https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg"
    subTitle='je test des trucs'
    title='hey hey heyyyyyyy' />)


