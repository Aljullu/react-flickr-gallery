import React from 'react';

import Gallery from '../Gallery/Gallery.jsx';
import GallerySelector from '../GallerySelector/GallerySelector.jsx';

/**
 * App Root Component, contains the app
 */
export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedGallery: '72157677539266623'
    };
  }

  /**
   * Generate a function to save the current gallery id to the state
   * as the selected gallery
   * @param {string} galleryId - id of the gallery to save as selected
   * @return {function} function that sets the selectedGallery state value to
   * the gallery id provided in the params
   */
  setSelectedGallery(galleryId) {
    return () => {
      this.setState({
        selectedGallery: galleryId
      });
    };
  }

  render() {
    const {selectedGallery} = this.state;
    const galleries = [{
      id: '72157677539266623',
      name: 'Animals'
    }, {
      id: '72157675104433185',
      name: 'Autumn'
    }];

    return (
      <div>
        <GallerySelector
          galleries={galleries}
          onGalleryClick={this.setSelectedGallery.bind(this)}
          selectedGallery={selectedGallery} />
        <Gallery
          galleryId={selectedGallery} />
      </div>
    );
  }
}
