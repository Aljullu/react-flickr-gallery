import React, {PropTypes} from 'react';

/**
 * Photo presentational component
 */
export default class PhotoImage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {load, owner, title, url} = this.props;

    if (!load) {
      return (
        <div className="photo-placeholder"></div>
      );
    }

    return (
      <div>
        <div className="photo-credits">
          <div className="photo-title">
            {title}
          </div>
          <div className="photo-owner">
            {owner}
          </div>
        </div>
        <img
          alt={title}
          className="photo-img"
          src={url} />
      </div>
    );
  }
}

PhotoImage.propTypes = {
  load: PropTypes.bool.isRequired,
  owner: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};
