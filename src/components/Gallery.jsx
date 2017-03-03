import React, {PropTypes} from 'react';

import Photos from './Photos.jsx';

/**
 * Gallery Container Component that loads the photos data
 */
export default class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: []
    };

    this.fetchPhotos(this.props.galleryId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps &&
      nextProps.galleryId &&
      this.props.galleryId !== nextProps.galleryId) {
      this.fetchPhotos(nextProps.galleryId);
    }
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
      const id = node.attributes[0].nodeValue;
      const owner = node.attributes[1].nodeValue;
      const secret = node.attributes[2].nodeValue;
      const server = node.attributes[3].nodeValue;
      const farm = node.attributes[4].nodeValue;
      const title = node.attributes[5].nodeValue;

      return {
        id: id,
        owner: owner,
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

  render() {
    const {photos} = this.state;

    return (
      <Photos
        photos={photos} />
    );
  }
}

Gallery.propTypes = {
  galleryId: PropTypes.string.isRequired
};
