import React from 'react'
import '../container/Myglides.js'
import './Previewglide.css'
import { Button, Segment, Grid, Modal, Header, Icon } from 'semantic-ui-react'
import { navigate, Link } from '@reach/router'

const Previewglide = ({ remove, embed, publicUrl, deleteGlide, glide , selectedId }) => {
  const { title, slidesIntroTitle, subtitle, imageUrl } = glide
  return (
    <Grid.Column>
      <Segment>
        <h3 style= {{height: '65px'}}>{title}</h3>
        <div className="GlideShare">

          <div className="PreviewBtn">
            <Link to={`/edit/${glide.id}`} >
              <div className="Previewglide" style={
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
            <Link to={`/edit/${glide.id}`} ><Button basic color='violet'>Edit</Button></Link>
            <React.Fragment>
              <Link to={`/myglides/${glide.id}/remove`}>
                <Button basic color='red'>Delete</Button>
              </Link>
              <Modal open={remove && glide.id === selectedId} basic size='small' onClose={() => navigate('/myglides')}>
                <Header icon='archive' content={`Are you sure you want to delete the  "${title}" ?`} />
                <Modal.Content>
                  <p>
                    Come on dude... this is a little bit excessive don't you think ?
                    <br />
                    Is this story a real desaster ?...
                  </p>
                </Modal.Content>
                <Modal.Actions>
                  <Button basic inverted onClick={() => navigate('/myglides')}>
                    <Icon name='remove' /> Cancel
                  </Button>
                  <Button inverted
                    color='red'
                    onClick={() => {
                      deleteGlide()
                      navigate('/myglides')
                    }}>
                    <Icon name='checkmark' /> Confirm Delete Glide
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

export default Previewglide
