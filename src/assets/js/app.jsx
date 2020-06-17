import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import NavBar from './components/navbar/NavBar';

const reactAppContainer = document.getElementById('react-app');

if (reactAppContainer) {
  ReactDOM.render(<App />, reactAppContainer);
}


// Navbar
const navbar = document.getElementById('navbar');

if (navbar) {
  ReactDOM.render(<NavBar />, navbar);
}
