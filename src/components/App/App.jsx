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
      scrollPosition: -1,
      selectedGallery: '72157677539266623'
    };
  }

  /**
   * Add listeners for scroll and resize on component mount
   */
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll.bind(this));
    window.addEventListener('resize', this.onResize.bind(this));
  }

  /**
   * Remove listeners for scroll and resize on component unmount
   */
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll.bind(this));
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  /**
   * Update scrollPosition value in state on scroll if the new scroll is greater
   * than the previous one
   */
  onScroll() {
    const newScroll = window.scrollY || window.pageYOffset;

    this.setState({
      scrollPosition: Math.max(this.state.scrollPosition, newScroll)
    });
  }

  /**
   * Update scrollPosition value in state on resize
   */
  onResize() {
    const newScroll = window.scrollY || window.pageYOffset;

    this.setState({
      scrollPosition: newScroll
    });
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
        scrollPosition: -1,
        selectedGallery: galleryId
      });
    };
  }

  render() {
    const {scrollPosition, selectedGallery} = this.state;
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
          galleryId={selectedGallery}
          scrollPosition={scrollPosition} />
      </div>
    );
  }
}
