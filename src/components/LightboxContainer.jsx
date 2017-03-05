import React, {PropTypes} from 'react';

import Lightbox from './Lightbox.jsx';

/**
 * Lightbox Container component
 */
export default class LightboxContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photoInfo: {}
    };

    this.fetchPhotoInfo(this.props.photo.id);
  }

  /**
   * Fetch photo info when the photoId changes
   * @param {object} nextProps - new props
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps &&
      nextProps.photo.id &&
      this.props.photo.id !== nextProps.photo.id) {
      this.fetchPhotoInfo(nextProps.photo.id);
    }
  }

  /**
   * Given an array of nodes, find the current node and get
   * an specific attribute
   * @param {array} infoNodes - array of nodes
   * @param {string} name - name of the node to find
   * @param {number} attribute - position of the attribute to get
   * @return {string} value of the attribute
   */
  getNodeAttribute(infoNodes, name, attribute) {
    const infoNode = infoNodes.filter((node) => node.tagName === name)[0];

    if (!infoNode || !infoNode.attributes ||
      !infoNode.attributes[attribute]) {
      return null;
    }

    return infoNode.attributes[attribute].nodeValue;
  }

  /**
   * Given an array of nodes, find the current node and get its text content
   * after removing line breaks and spaces
   * @param {array} infoNodes - array of nodes
   * @param {string} name - name of the node to find
   * @return {string} text of the node
   */
  getNodeText(infoNodes, name) {
    const infoNode = infoNodes.filter((node) => node.tagName === name)[0];

    if (!infoNode || !infoNode.textContent) {
      return null;
    }

    return infoNode.textContent.replace(/(\r\n|\n|\r|\s)/gm, '');
  }

  /**
   * Given the XML string from the flickr server, generates an object of the
   * photo data
   * @param {string} data - string with the XML code given by the flickr API
   * @return {object\array} photos - array of photos data
   */
  parsePhotoInfo(data) {
    const parsedData =
      (new window.DOMParser()).parseFromString(data, 'text/xml');

    const childNodes = parsedData.documentElement.childNodes[1].childNodes;
    const nodes = Array.prototype.slice.call(childNodes);
    const infoNodes = nodes.filter((node) => Boolean(node.tagName));

    const photoInfo = {
      date: this.getNodeAttribute(infoNodes, 'dates', 1),
      description: this.getNodeText(infoNodes, 'description'),
      owner: this.getNodeAttribute(infoNodes, 'owner', 1),
      ownerName: this.getNodeAttribute(infoNodes, 'owner', 2),
      link: this.getNodeText(infoNodes, 'urls')
    };

    return photoInfo;
  }

  /**
   * Get photo info from flickr server and save them in the state
   * of the component
   * @param {string} photoId - id of the photo to load
   */
  fetchPhotoInfo(photoId) {
    const galleryUrl =
      'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=a042a5f1babdcbda4e431eba7099d329&photo_id=' + photoId;

    window.fetch(galleryUrl, {
      method: 'get',
      headers: {
        Accept: 'text/xml'
      }
    }).then((response) => {
      response.text().then((data) => {
        this.setState({
          photoInfo: this.parsePhotoInfo(data)
        });
      }).catch((e) => {
        console.error(e);
      });
    }).catch((e) => {
      console.error(e);
    });
  }

  render() {
    const {onClose, photo} = this.props;
    const {photoInfo} = this.state;

    return (
      <Lightbox
        onClose={onClose}
        photo={Object.assign(photo, photoInfo)} />
    );
  }
}

LightboxContainer.propTypes = {
  onClose: PropTypes.func.isRequired,
  photo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
};
