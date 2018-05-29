import React from 'react'

const styleText = {
  width : '40 %',
  marginLeft : '20%',
  marginRight : '20%',
  padding : '5vh',
  background : 'white',
  zindex : 1,
  height : '60vh',
  textAlign : 'center',
  display : 'flex',
  alignItems : 'center',
}

const stylePage = {
  background : '#EDEDED',
  zindex : 0,
  height : '100vh',
  paddingTop : '10vh',
}

const nextBtn = {
  marginTop : '30vh',
  float : 'right',
  background : '#006784',
  color : 'white',
  padding : '1vh 3vh 1vh 3vh',
  border : 'none',
}

const previewBtn = {
  marginTop : '30vh',
  float : 'left',
  background : '#006784',
  color : 'white',
  padding : '1vh 3vh 1vh 3vh',
  border : 'none',
}

const SlideText = ({handleNavigation, handlePrevious, slide}) => {
  return (
    <div style={stylePage}>
      <button style={previewBtn} onClick={() => handlePrevious()}>Preview</button>
      <button style={nextBtn} onClick={() => handleNavigation()}>Next</button>
      <div style={styleText}>
        <p>{slide.text}</p>
      </div>
    </div>
  )
}

export default SlideText
