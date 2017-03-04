import React, {PropTypes} from 'react';

import './lightbox.css';

/**
 * Lightbox component
 */
export default class Lightbox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {onClose} = this.props;
    const {owner, title, url} = this.props.photo;

    return (
      <div className="lightbox" onClick={onClose}>
        <div className="lightbox-credits">
          <div className="lightbox-title">
            {title}
          </div>
          <div className="lightbox-owner">
            {owner}
          </div>
        </div>
        <img
          alt={title}
          className="lightbox-img"
          src={url} />
      </div>
    );
  }
}

Lightbox.propTypes = {
  onClose: PropTypes.func.isRequired,
  photo: PropTypes.shape({
    owner: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
};
