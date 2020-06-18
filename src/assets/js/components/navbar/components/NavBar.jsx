import React from 'react';
import PropTypes from 'prop-types';

import { hot } from 'react-hot-loader';

import NavItem from './NavItem';
import ColorModeItem from './ColorModeItem';

function NavBar(props) {
  const {
    logoItem: { svg: logoSvg, text: logoText },
    colorModeItem: { svg: colorModeSvg, text: colorModeText },
    navItems,
  } = props;
  return (
    <header className="navbar">
      <ul className="navbar-nav">
        {/* Nav-Logo */}
        <li id="logo" className="nav-logo">
          <a href="/" className="nav-link">
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: logoSvg }} />
            <span className="link-text logo-text">{logoText}</span>
          </a>
        </li>

        {/* Color Shifter */}
        <ColorModeItem svg={colorModeSvg} linkText={colorModeText} />

        {/* Nav Items */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {navItems.map((navItem) => <NavItem key={navItem.svg} {...navItem} />)}
      </ul>
    </header>
  );
}

NavBar.propTypes = {
  logoItem: PropTypes.objectOf(PropTypes.string).isRequired,
  colorModeItem: PropTypes.objectOf(PropTypes.string).isRequired,
  navItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default hot(module)(NavBar);
