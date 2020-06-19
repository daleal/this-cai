import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import NavBar from './components/navbar/NavBar';
import ChatIndex from './components/chat/ChatIndex';
import Chat from './components/chat/Chat';
import AnonymousMessages from './components/chat/AnonymousMessages';

const reactAppContainer = document.getElementById('react-app');

if (reactAppContainer) {
  ReactDOM.render(<App />, reactAppContainer);
}


// Navbar
const navbar = document.getElementById('navbar');

if (navbar) {
  ReactDOM.render(<NavBar />, navbar);
}


// Chat
const chatIndex = document.getElementById('chat-index');

if (chatIndex) {
  ReactDOM.render(<ChatIndex />, chatIndex);
}

const chat = document.getElementById('chat');

if (chat) {
  ReactDOM.render(<Chat />, chat);
}

const anonymousMessages = document.getElementById('anonymous-messages');

if (anonymousMessages) {
  ReactDOM.render(<AnonymousMessages />, anonymousMessages);
}
