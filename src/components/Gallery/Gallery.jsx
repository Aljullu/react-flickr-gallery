import React, {PropTypes} from 'react';

import LightboxContainer from '../LightboxContainer/LightboxContainer.jsx';
import PhotoContainer from '../PhotoContainer/PhotoContainer.jsx';

/**
 * Gallery Container Component that loads the photos data
 */
export default class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      scrollPosition: -1,
      selectedPhoto: null
    };

    this.fetchPhotos(this.props.galleryId);
  }

  /**
   * Fetch photos when the galleryId changes
   * @param {object} nextProps - new props
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps &&
      nextProps.galleryId &&
      this.props.galleryId !== nextProps.galleryId) {
      this.fetchPhotos(nextProps.galleryId);
    }
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
    const newScroll = window.scrollY;

    this.setState({
      scrollPosition: Math.max(this.state.scrollPosition, newScroll)
    });
  }

  /**
   * Update scrollPosition value in state on resize
   */
  onResize() {
    const newScroll = window.scrollY;

    this.setState({
      scrollPosition: newScroll
    });
  }

  /**
   * Given some data about the photos, generates the URL to load the image
   * @param {string} farm - first element of the URL
   * @param {string} server - server where the image is stored
   * @param {string} id - id of the image
   * @param {string} secret - secret id of the image
   * @return {string} URL of the image
   */
  formatUrl(farm, server, id, secret) {
    return 'https://c1.staticflickr.com/' + farm + '/' + server +
      '/' + id + '_' + secret + '_b.jpg';
  }

  /**
   * Given a list of attributes, find the value of one of them given the name
   * @param {object} attributes - NamedNodeMap of attributes
   * @param {string} name - name of the attribute to find
   * @return {string} value of the attribute
   */
  getNodeAttribute(attributes, name) {
    const attributesArray = Array.prototype.slice.call(attributes);
    const attribute = attributesArray.filter((attr) => attr.name === name)[0];

    if (!attribute) {
      return null;
    }

    return attribute.value;
  }

  /**
   * Given the XML string from the flickr server, generates an array of photos
   * @param {string} data - string with the XML code given by the flickr API
   * @return {object\array} photos - array of photos data
   */
  parsePhotosData(data) {
    const parsedData =
      (new window.DOMParser()).parseFromString(data, 'text/xml');
    const childNodes = parsedData.documentElement.childNodes[1].childNodes;
    const nodes = Array.prototype.slice.call(childNodes);
    const photoNodes = nodes.filter((node) => node.tagName === 'photo');
    const photos = photoNodes.map((node) => {
      const id = this.getNodeAttribute(node.attributes, 'id');
      const secret = this.getNodeAttribute(node.attributes, 'secret');
      const server = this.getNodeAttribute(node.attributes, 'server');
      const farm = this.getNodeAttribute(node.attributes, 'farm');
      const title = this.getNodeAttribute(node.attributes, 'title');

      return {
        id: id,
        title: title,
        url: this.formatUrl(farm, server, id, secret)
      };
    });

    return photos;
  }

  /**
   * Get photos from flickr server and save them in the state of the component
   * @param {string} galleryId - id of the gallery to load
   */
  fetchPhotos(galleryId) {
    const galleryUrl =
      'https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=a042a5f1babdcbda4e431eba7099d329&gallery_id=' + galleryId;

    window.fetch(galleryUrl, {
      method: 'get',
      headers: {
        Accept: 'text/xml'
      }
    }).then((response) => {
      response.text().then((data) => {
        this.setState({
          photos: this.parsePhotosData(data)
        });
      }).catch((e) => {
        console.error(e);
      });
    }).catch((e) => {
      console.error(e);
    });
  }

  /**
   * Generate a function to save the current photo id to the state
   * as the selected photo
   * @param {string} photoId - id of the photo to select
   * @return {function} function that sets the selectedPhoto state value to the
   * photo id provided in the params
   */
  onSelectPhoto(photoId) {
    return () => {
      this.setState({
        selectedPhoto: photoId
      });
    };
  }

  /**
   * Search in the photos array from the state for the selected photo
   * and return its data
   * @return {object} data of the selected photo or null if no photo is selected
   */
  getSelectedPhotoData() {
    const {photos, selectedPhoto} = this.state;

    if (selectedPhoto) {
      return photos.filter((photo) => photo.id === selectedPhoto)[0];
    }

    return null;
  }

  render() {
    const {photos, scrollPosition} = this.state;

    const selectedPhotoData = this.getSelectedPhotoData();

    return (
      <div>
        {photos.map((photo) =>
          <PhotoContainer
            key={photo.id}
            onSelect={this.onSelectPhoto(photo.id).bind(this)}
            photo={photo}
            scrollPosition={scrollPosition} />
        )}
        {selectedPhotoData ?
          <LightboxContainer
            onClose={this.onSelectPhoto(null).bind(this)}
            photo={selectedPhotoData} /> :
        null}
      </div>
    );
  }
}

Gallery.propTypes = {
  galleryId: PropTypes.string.isRequired
};
