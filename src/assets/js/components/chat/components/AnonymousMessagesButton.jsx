import React from 'react';
import PropTypes from 'prop-types';

import { hot } from 'react-hot-loader';

function AnonymousMessageButton(props) {
  const { url, text } = props;

  /* eslint-disable
    jsx-a11y/click-events-have-key-events,
    jsx-a11y/no-static-element-interactions
  */
  return (
    <div onClick={() => { window.location.href = url; }} className="column is-6 ">
      <div className="card is-round chat-message-card anonymous-message-card">
        <div className="chat-message">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
  /* eslint-enable
    jsx-a11y/click-events-have-key-events,
    jsx-a11y/no-static-element-interactions
  */
}

AnonymousMessageButton.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default hot(module)(AnonymousMessageButton);
