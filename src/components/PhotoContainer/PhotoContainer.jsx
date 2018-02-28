import React from 'react';
import PropTypes from 'prop-types';

import Photo from '../Photo/Photo.jsx';

/**
 * Photo container
 */
export default class PhotoContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {onSelect, photo, scrollPosition} = this.props;

    return (
      <div
        className="photo"
        onClick={onSelect}
        ref="photo">
        <Photo
          title={photo.title}
          url={photo.url}
          scrollPosition={scrollPosition} />
      </div>
    );
  }
}

PhotoContainer.propTypes = {
  onSelect: PropTypes.func.isRequired,
  photo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
};
