import React, {PropTypes} from 'react';

import './lightbox.css';

/**
 * Lightbox Presentational component
 */
export default class Lightbox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {onClose} = this.props;
    const {date, link, owner, title, url} = this.props.photo;

    return (
      <div className="lightbox" onClick={onClose}>
        <div className="lightbox-credits">
          <div className="lightbox-title">
            {title}
          </div>
          {link && owner ? (
            <a
              className="lightbox-owner"
              href={link}>
              {owner}
            </a>
          ) : null}
          {link && owner && date ? (
            <span> - {date}</span>
          ) : null}
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
    date: PropTypes.string,
    link: PropTypes.string,
    owner: PropTypes.string,
    title: PropTypes.string.isRequired,
    url: PropTypes.string
  }).isRequired
};
