import React, { Component } from 'react';
import NavBarComponent from './components/NavBar';
import navbarService from '../../services/navbar';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      logoItem: null,
      colorModeItem: null,
      navItems: null,
    };

    this.fetchNavBarMetadata = this.fetchNavBarMetadata.bind(this);
  }

  componentDidMount() {
    this.fetchNavBarMetadata();
  }

  async fetchNavBarMetadata() {
    this.setState({ loading: true });
    const navbarMetadata = await navbarService.getNavBarMetadata();
    const { logoItem, colorModeItem, navItems } = navbarMetadata;
    this.setState({
      logoItem, colorModeItem, navItems, loading: false,
    });
  }

  render() {
    const {
      loading, logoItem, colorModeItem, navItems,
    } = this.state;
    if (loading) {
      return <header className="navbar" />;
    }

    return (
      <NavBarComponent
        logoItem={logoItem}
        colorModeItem={colorModeItem}
        navItems={navItems}
      />
    );
  }
}
