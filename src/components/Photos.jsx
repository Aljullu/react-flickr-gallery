import React, {PropTypes} from 'react';

import './photos.css';

/**
 * Photos presentational container
 */
export default class Photos extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {photos} = this.props;

    return (
      <div className="photos">
        {photos.map((photo) =>
          <div key={photo.id} className="photo">
            <div className="photo-credits">
              <div className="photo-title">
                {photo.title}
              </div>
              <div className="photo-owner">
                {photo.owner}
              </div>
            </div>
            <img
              alt={photo.title}
              className="photo-img"
              src={photo.url} />
          </div>
        )}
      </div>
    );
  }
}

Photos.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired).isRequired
};
