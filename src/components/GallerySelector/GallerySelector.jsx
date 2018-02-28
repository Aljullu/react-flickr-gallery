import React from 'react';
import PropTypes from 'prop-types';

import './gallery-selector.css';

/**
 * Gallery Selector
 */
export default class GallerySelector extends React.Component {
  render() {
    const {galleries, selectedGallery, onGalleryClick} = this.props;

    return (
      <div className="gallery-selector">
        {galleries.map((gallery) =>
          <button
            className="gallery-selector-button"
            key={gallery.name}
            disabled={selectedGallery === gallery.id}
            onClick={onGalleryClick(gallery.id)}>
            {gallery.name}
          </button>
        )}
      </div>
    );
  }
}

GallerySelector.propTypes = {
  galleries: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  selectedGallery: PropTypes.string.isRequired,
  onGalleryClick: PropTypes.func.isRequired
};
