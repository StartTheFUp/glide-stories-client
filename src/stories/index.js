import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import SlideText from '../components/SlideText'
import SlideDisplay from '../container/SlideDisplay'
import SlideIntro from '../components/SlideIntro'
import SlideImage from '../components/SlideImage.js'
import SlideCallToAction from '../components/SlideCallToAction.js'
import SlideTweet from '../components/SlideTweet.js'
import SlideArticleQuote from '../components/SlideArticleQuote.js'
import AddSlideBtn from '../components/AddSlideBtn.js'
import 'semantic-ui-css/semantic.min.css'
import '../App.css'

const slideWrap = cp => <div className='__SlideDisplay'>{cp}</div>

storiesOf('SlideDisplay', module)
  .add('show a text slide', () =>
    slideWrap(<SlideDisplay
      handleNext={action('Load next slide')}
      handlePrevious={action('Load previous slide')}
      slide={{
        type: 'text',
        text: 'Slide Text Example'
      }}
    />))

storiesOf('SlideText', module)
  .add('show verticaly centred text property', () =>
    slideWrap(<SlideText text='hey hey heyyyyyyy' />))
  .add('show emoji', () =>
    slideWrap(<SlideText text={<span role='img' aria-label='great job'>
        ⭐👏⭐👏⭐👏⭐👏
    </span>} />))

storiesOf('SlideIntro', module)
  .add('Display slide intro', () =>
    slideWrap(<SlideIntro
      image='http://cosmetotheque.com/wp-content/uploads/2018/04/mario-gogh-589733-unsplash-1200x385.jpg'
      subtitle='Life in Motion — Egon Schiele and Francesca Woodman, Tate Liverpool'
      title='Art review' />))

storiesOf('SlideImage', module)
  .add('Display slide Image Text', () =>
    slideWrap(<SlideImage
      image='https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg'
      text='As for Tate St Ives, there has never been a pressing reason for it to exist, and its fate, alas, is to fiddle away at the margins of art, being ignored. Tate Liverpool, however, goes from strength to strength. Everything works here. The Merseyside location is…'
    />))

storiesOf('SlideCallToAction', module)
  .add('Display slide CallToAction', () =>
    slideWrap(<SlideCallToAction
      image='https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg'
      subtitle='subtitle'
      title='title'
      btnText='callToAction'
      btnLink='www.google.com'
    />))

storiesOf('SlideTweet', module)
  .add('Display slide TweetQuote', () =>
    slideWrap(<SlideTweet
      authorPicture='https://pbs.twimg.com/profile_images/685018005990993920/bQzEIcoY_normal.jpg'
      authorName='La Villette'
      authorScreenName='@LaVillette'
      text='#CloudGateDance " des instants d’une rare poésie " via @sceneweb https://t.co/dMDvRAZKqo https://t.co/oIpgAt8yQx'
      createdAt='8:50 PM - Jun 8, 2018'
    />))

storiesOf('SlideArticleQuote', module)
  .add('Display slide ArticleQuote', () =>
    slideWrap(<SlideArticleQuote
      source='Le Monde'
      authorName='Jacob Milza'
      text='« La supernature pose la question de notre place d’humain dans un monde de machines », commente la commissaire. Si on parle trop fort, les fleurs de la roseraie électronique, conçue par l’artiste sud-africaine Miranda Moss, vont se refermer.'
    />))

storiesOf('AddSlideBtn', module)
  .add('Display AddSlide btn - logo', () =>
    <AddSlideBtn icon='plus icon' />)
  .add('AddSlide btn - logo upload', () =>
    <AddSlideBtn icon='upload icon' />)
  .add('AddSlide btn - logo edit', () =>
    <AddSlideBtn icon='edit outline' />)
