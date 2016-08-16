import React from 'react';
import Modal from 'react-modal';
import { ButtonToolbar } from 'react-bootstrap';
import ArtViewer from './ArtViewer.js';
import UploadButton from './../upload/UploadButton.js';
import { connection } from './../upload/uploadState.js';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(239, 249, 245, 0.74902)',
    zIndex: 1,
    overflow: 'auto'
  },
  content: {
    position: 'relative',
    top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px',
    border: '1px solid rgb(204, 204, 204)',
    overflow: 'auto',
    borderRadius: '4px',
    padding: '20px',
    background: 'rgba(255, 255, 255, .7)',
    width: '90%'
  }
};

class ArtComponent extends React.Component {
	constructor(props) {
		super(props);
    console.log(props)
    this.showPhoto = this.showPhoto.bind(this);
  }
    
    showPhoto(id) {
      console.log(this.props);
      this.props.photoClick(id);
    }

  render() {
    let source = '/storage/art/' + this.props.art + '/' + this.props.art + '_FULL';
    return <img onClick={() => this.showPhoto(this.props.art)} src={source} className='artPiece' />;
  }
}

class ArtSelector extends React.Component {
    constructor(props) {
      super(props);
      
      this.art = [];
    }

    componentDidMount() {
      this.props.populateArtFiles();//.then(this.art = this.props.files);
    }


    render() {
      this.art = this.props.files
      console.log('artSelector Objects:', this.art);
      var context = this;
      return (
        <Modal
          className='ArtModal'
          isOpen={this.props.artModalState}
          style={ customStyles }>
          <div className='artContainer col-xs-2'>
            {context.art.map(num => <div><ArtComponent photoClick={this.props.updateCurrentArt} art={num.id} /><br/></div>)}
          </div>
          <ArtViewer art={this.props.currentArt} />
          <div className='col-xs-12' style={{paddingRight: 0}}>
            <ButtonToolbar className='col-xs-4 col-xs-offset-8' style={{ float: 'right' }}>
              <UploadButton  class='ArtModalButton' text='Upload Photos' clickFunc={ this.props.switchUploadModalState }  btn-mad clearfix form-control/>
              <UploadButton  class='ArtModalButton' text='Close'  btn-mad clearfix form-control/>
            </ButtonToolbar>
          </div>
        </Modal>
      );
    }
}

export default connection(ArtSelector);