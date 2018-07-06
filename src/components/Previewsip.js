import React from 'react'
import '../container/Mysips.js'
import './Previewsip.css'
import { Button, Segment, Grid, Modal, Header, Icon } from 'semantic-ui-react'
import { navigate, Link } from '@reach/router'

const Previewsip = ({ remove, embed, publicUrl, deleteSip, sip, selectedId }) => {
  const { title, slidesIntroTitle, subtitle, imageUrl } = sip
  console.log({ title, id: sip.id })
  return (
    <Grid.Column>
      <Segment>
        <h3 style= {{height: '65px'}}>{title}</h3>
        <div className="SipShare">

          <div className="PreviewBtn">
            <Link to={`/edit/${sip.id}`} >
              <div className="Previewsip" style={
                {backgroundImage: `url(${imageUrl})`,
                  backgroundSize: 'cover'}
              }>
                <h1>{slidesIntroTitle}</h1>
                <h2>{subtitle}</h2>

              </div>
            </Link>
            <div className="BoxShare">
              <h4>Embed</h4>
              <textarea readOnly rows='3' value={embed} />
            </div>

            <div className="BoxShare">
              <h4>Public URL</h4>
              <div className="url">{publicUrl}</div>
            </div>
          </div>
          <div className="Btn">
            <Link to={`/edit/${sip.id}`} ><Button basic color='violet'>Edit</Button></Link>
            <React.Fragment>
              <Link to={`/mysips/${sip.id}/remove`}>
                <Button basic color='red'>Delete</Button>
              </Link>
              <Modal open={remove && sip.id === selectedId} basic size='small' onClose={() => navigate('/mysips')}>
                <Header icon='archive' content={`Are you sure you want to delete the sip "${title}" ?`} />
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
                      console.log('delete salopette', sip)
                      deleteSip(sip)
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
  )
}

export default Previewsip
