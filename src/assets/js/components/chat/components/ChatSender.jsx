import React from 'react';
import PropTypes from 'prop-types';

import { hot } from 'react-hot-loader';

function send(sender) {
  async function wrapper() {
    const $chatInput = document.getElementById('chat-input');
    const content = $chatInput.value.trim();
    if (content !== '') {
      const success = await sender(content);
      if (success) {
        $chatInput.value = '';
      }
    }
  }

  return wrapper;
}

function ChatSender(props) {
  const { sender } = props;

  /* eslint-disable
    jsx-a11y/click-events-have-key-events,
    jsx-a11y/no-static-element-interactions
  */
  return (
    <div className="columns">
      <div className="column is-12 ">
        <div className="card is-round chat-sender-card">
          <textarea id="chat-input" type="text" className="chat-input" />
          <div onClick={send(sender)} className="chat-send">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-double-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="svg-inline--fa fa-angle-double-right fa-w-14 fa-9x"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z" className="chat-send-svg" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
  /* eslint-enable
    jsx-a11y/click-events-have-key-events,
    jsx-a11y/no-static-element-interactions
  */
}

ChatSender.propTypes = {
  sender: PropTypes.func.isRequired,
};

export default hot(module)(ChatSender);
