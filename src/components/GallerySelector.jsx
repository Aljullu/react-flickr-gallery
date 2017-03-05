import React, {PropTypes} from 'react';

/**
 * Gallery Selector
 */
export default class GallerySelector extends React.Component {
  render() {
    const {galleries, selectedGallery, onGalleryClick} = this.props;

    return (
      <div>
        {galleries.map((gallery) =>
          <button
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
