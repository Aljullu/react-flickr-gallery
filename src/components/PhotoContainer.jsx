import React, {PropTypes} from 'react';

import Photo from './Photo.jsx';

import './photo.css';

/**
 * Photo container
 */
export default class PhotoContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayImage: false
    };
  }

  /**
   * Check if the photo must be displayed when the component is mounted
   */
  componentDidMount() {
    this.setState({
      displayImage: this.shouldPhotoBeDisplayed(this.props)
    });
  }

  /**
   * Check if the photo must be displayed when the props change
   * @param {object} nextProps - newProps
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      displayImage: this.shouldPhotoBeDisplayed(nextProps)
    });
  }

  /**
   * Check if the photo is visible in the user screen
   * @param {object} props - properties
   * @param {number} props.scrollPosition - scroll position of the user window
   * @return {bool} true when the photo container is in the viewport, false if
   * it's not or the component is not yet loaded
   */
  isPhotoInViewport(props) {
    if (!this.refs.photo) {
      return false;
    }

    const {scrollPosition} = props;

    return Boolean(scrollPosition + window.innerHeight >
      this.refs.photo.offsetTop);
  }

  /**
   * Return true if the photo must be displayed: it's visible to the user or it
   * was already displayed
   * @param {object} props - properties
   * @return {bool} true when the photo must be displayed
   */
  shouldPhotoBeDisplayed(props) {
    if (this.state.displayImage) {
      return true;
    }

    return this.isPhotoInViewport(props);
  }

  render() {
    const {onSelect, photo} = this.props;

    return (
      <div
        className="photo"
        onClick={onSelect}
        ref="photo">
        <Photo
          load={this.state.displayImage}
          title={photo.title}
          url={photo.url} />
      </div>
    );
  }
}

PhotoContainer.propTypes = {
  onSelect: PropTypes.func.isRequired,
  photo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired,
  scrollPosition: PropTypes.number.isRequired
};
