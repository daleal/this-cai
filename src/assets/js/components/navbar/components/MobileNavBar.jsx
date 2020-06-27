import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { hot } from 'react-hot-loader';

import NavItem from './NavItem';
import ColorModeItem from './ColorModeItem';
import MenuItem from './MenuItem';
import ModalItem from './ModalItem';

import modalService from '../../../services/mobileNavBarModal';

function toggleModal(setActive) {
  function wrapper(event) {
    event.preventDefault();
    const active = modalService.toggleModal('mobile-navbar-modal');
    setActive(active);
  }

  return wrapper;
}

function NavBar(props) {
  const {
    logoItem: { svg: logoSvg, text: logoText },
    colorModeItem: { svg: colorModeSvg },
    menuItem: { svg: menuSvg, text: menuText },
    navItems,
  } = props;
  const [isActive, setActive] = useState(false);

  return (
    <header className="navbar">
      <ul className="navbar-nav">
        {/* Nav-Logo */}
        <NavItem
          svg={logoSvg}
          href="/"
          linkText={logoText}
        />

        {/* Color Shifter */}
        <ColorModeItem svg={colorModeSvg} />

        {/* Menu Item */}
        <MenuItem
          svg={menuSvg}
          linkText={menuText}
          activateMenu={toggleModal(setActive)}
        />
      </ul>
      <div id="mobile-navbar-modal">
        <div className="mobile-navbar-modal">
          <ul>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {navItems.map((navItem) => <ModalItem key={navItem.svg} {...navItem} />)}
          </ul>
        </div>
        {
          /* eslint-disable
            jsx-a11y/click-events-have-key-events,
            jsx-a11y/no-static-element-interactions
          */
        }
        <div
          onClick={isActive ? toggleModal(setActive) : null}
          className="mobile-navbar-modal-overlay"
        />
        {
          /* eslint-enable
            jsx-a11y/click-events-have-key-events,
            jsx-a11y/no-static-element-interactions
          */
        }
      </div>
    </header>
  );
}

NavBar.propTypes = {
  logoItem: PropTypes.objectOf(PropTypes.string).isRequired,
  colorModeItem: PropTypes.objectOf(PropTypes.string).isRequired,
  menuItem: PropTypes.objectOf(PropTypes.string).isRequired,
  navItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default hot(module)(NavBar);
