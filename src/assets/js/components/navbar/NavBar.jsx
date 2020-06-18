import React, { Component } from 'react';
import NavBarComponent from './components/NavBar';
import MobileNavBarComponent from './components/MobileNavBar';
import navbarService from '../../services/navbar';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      logoItem: null,
      colorModeItem: null,
      menuItem: null,
      navItems: null,
    };

    this.fetchNavBarMetadata = this.fetchNavBarMetadata.bind(this);
    this.resizeScreen = this.resizeScreen.bind(this);
  }

  componentDidMount() {
    this.fetchNavBarMetadata();
    window.addEventListener('resize', this.resizeScreen);
  }

  async fetchNavBarMetadata() {
    this.setState({ loading: true });
    const navbarMetadata = await navbarService.getNavBarMetadata();
    const {
      logoItem, colorModeItem, menuItem, navItems,
    } = navbarMetadata;
    this.setState({
      logoItem, colorModeItem, menuItem, navItems, loading: false,
    });
  }

  resizeScreen() {
    this.forceUpdate();
  }

  render() {
    const {
      loading, logoItem, colorModeItem, menuItem, navItems,
    } = this.state;

    if (loading) {
      return <header className="navbar" />;
    }
    if (window.innerWidth > 600) {
      return (
        <NavBarComponent
          logoItem={logoItem}
          colorModeItem={colorModeItem}
          navItems={navItems}
        />
      );
    }
    return (
      <MobileNavBarComponent
        logoItem={logoItem}
        colorModeItem={colorModeItem}
        menuItem={menuItem}
        navItems={navItems}
      />
    );
  }
}
