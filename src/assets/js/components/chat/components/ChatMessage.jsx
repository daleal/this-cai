import React from 'react';
import PropTypes from 'prop-types';

import { hot } from 'react-hot-loader';

function ChatMessage(props) {
  const { content, isOwner } = props;

  /* eslint-disable
    jsx-a11y/click-events-have-key-events,
    jsx-a11y/no-static-element-interactions
  */
  return (
    <div className="columns">
      {!!isOwner && (
        <div className="column is-7" />
      )}
      <div className="column is-5 ">
        <div className={`card is-round chat-message-card ${isOwner ? 'is-owner' : ''}`}>
          <div className="chat-message">
            <p>{content}</p>
          </div>
        </div>
      </div>
      {!isOwner && (
        <div className="column is-7" />
      )}
    </div>
  );
  /* eslint-enable
    jsx-a11y/click-events-have-key-events,
    jsx-a11y/no-static-element-interactions
  */
}

ChatMessage.propTypes = {
  content: PropTypes.string.isRequired,
  isOwner: PropTypes.bool.isRequired,
};

export default hot(module)(ChatMessage);
