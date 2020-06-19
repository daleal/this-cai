import React from 'react';
import PropTypes from 'prop-types';

import { hot } from 'react-hot-loader';

function ChatIndexButton(props) {
  const { url, text, image } = props;

  /* eslint-disable
    jsx-a11y/click-events-have-key-events,
    jsx-a11y/no-static-element-interactions
  */
  return (
    <div
      onClick={() => { window.location.href = url; }}
      className="card is-round chat-conversation-card"
    >
      <div className="chat-conversation">
        <img className="image" src={image} alt="" />
        <p>{text}</p>
      </div>
    </div>
  );
  /* eslint-enable
    jsx-a11y/click-events-have-key-events,
    jsx-a11y/no-static-element-interactions
  */
}

ChatIndexButton.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default hot(module)(ChatIndexButton);
