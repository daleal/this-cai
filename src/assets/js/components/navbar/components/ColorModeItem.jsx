import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { hot } from 'react-hot-loader';

import colorsService from '../../../services/colors';

function switchColor(setText) {
  function wrapper(event) {
    event.preventDefault();
    colorsService.switchColor();
    setText(colorsService.getButtonText());
  }

  return wrapper;
}

function ColorModeItem(props) {
  const { svg, linkText } = props;
  const [text, setText] = useState(linkText);

  return (
    <li className="nav-item">
      <a onClick={switchColor(setText)} href="/" className="nav-link">
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: svg }} />
        <span id="theme-selector-text" className="link-text">
          {text}
        </span>
      </a>
    </li>
  );
}

ColorModeItem.propTypes = {
  svg: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
};

export default hot(module)(ColorModeItem);
