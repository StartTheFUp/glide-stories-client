import React from 'react'

const SlideText = ({handleNavigation, slide}) => {
  return (
    <div onClick={() => handleNavigation()}>
      <p>{slide.text}</p>
    </div>
  )
}

export default SlideText
