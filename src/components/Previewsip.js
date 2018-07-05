import React from 'react'
import '../container/Mysips.js'
import './Previewsip.css'
import { Button, Segment, Grid, Modal, Header, Icon } from 'semantic-ui-react'
import { navigate, Link } from '@reach/router'

const Previewsip = ({ title, remove, slideIntroTitle, slideIntroSubtitle, SlideIntroImage, embed, publicUrl, sipId, deleteSip, sipContent }) =>
  <Grid.Column>
    <Segment>
      <h3>{title}</h3>
      <div className="SipShare">

        <div className="BoxShare">
          <h4>Embed</h4>
          <textarea readOnly rows='3' value={embed} />
        </div>

        <div className="BoxShare">
          <h4>Public URL</h4>
          <div className="url">{publicUrl}</div>
        </div>
      </div>

      <div className="PreviewBtn">
        <Link to={`/edit/${sipId}`} >
          <div className="Previewsip" style={
            {backgroundImage: `url(${SlideIntroImage})`,
              backgroundSize: 'cover'}
          }>
            <h1>{slideIntroTitle}</h1>
            <h2>{slideIntroSubtitle}</h2>

          </div>
        </Link>
        <div className="Btn">
          <Button basic color='blue'><Link to={`/edit/${sipId}`} >Edit</Link></Button>
          <React.Fragment>
            <Link to='/mysips/remove'>
              <Button basic color='red'>Delete</Button>
            </Link>
            <Modal open={remove} basic size='small' onClose={() => navigate('/mysips')}>
              <Header icon='archive' content='Are you sure you want to delete this sip ?' />
              <Modal.Content>
                <p>
                  Come on dude... this is a little bit excessive don't you think ?
                  <br />
                  Is this story a real desaster ?...
                </p>
              </Modal.Content>
              <Modal.Actions>
                <Button basic inverted onClick={() => navigate('/mysips')}>
                  <Icon name='remove' /> Cancel
                </Button>
                <Button inverted
                  color='red'
                  onClick={() => {
                    deleteSip(sipContent)
                    navigate('/mysips')
                  }}>
                  <Icon name='checkmark' /> Confirm Delete Sip
                </Button>
              </Modal.Actions>
            </Modal>
          </React.Fragment>
        </div>
      </div>
    </Segment>
  </Grid.Column>

export default Previewsip
