import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { hot } from 'react-hot-loader';


function MenuItem(props) {
  const { svg, linkText, activateMenu } = props;

  return (
    <li className="nav-item">
      <a onClick={activateMenu} href="/" className="nav-link">
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: svg }} />
        <span id="theme-selector-text" className="link-text">
          {linkText}
        </span>
      </a>
    </li>
  );
}

MenuItem.propTypes = {
  svg: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  activateMenu: PropTypes.func.isRequired,
};

export default hot(module)(MenuItem);
