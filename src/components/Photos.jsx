import React, {PropTypes} from 'react';

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
            <p>{photo.title} - {photo.owner}</p>
            <img src={photo.url} alt={photo.title} height="300" width="300"/>
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
