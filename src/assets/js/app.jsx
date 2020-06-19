import React from 'react';
import ReactDOM from 'react-dom';
import ArticleForm from './components/form/ArticleForm';
import OrganizationForm from './components/form/OrganizationForm';
import ProjectForm from './components/form/ProjectForm';
import SignInForm from './components/form/SignInForm';
import EditUserForm from './components/form/EditUserForm';
import InventoryItemFrom from './components/form/InventoryItemForm';
import LostItemForm from './components/form/LostItemForm';
import EventForm from './components/form/EventForm';

import App from './components/App';
import NavBar from './components/navbar/NavBar';
import ChatIndex from './components/chat/ChatIndex';
import Chat from './components/chat/Chat';
import AnonymousMessages from './components/chat/AnonymousMessages';

const organizationForm = document.getElementById('organization-form');

if (organizationForm) {
  ReactDOM.render(<OrganizationForm />, organizationForm);
}

const projectForm = document.getElementById('project-form');

if (projectForm) {
  ReactDOM.render(<ProjectForm />, projectForm);
}

const articleForm = document.getElementById('article-form');

if (articleForm) {
  ReactDOM.render(<ArticleForm />, articleForm);
}

const signInForm = document.getElementById('signin-form');

if (signInForm) {
  ReactDOM.render(<SignInForm />, signInForm);
}

const editUserForm = document.getElementById('edit-user-form');

if (editUserForm) {
  ReactDOM.render(<EditUserForm />, editUserForm);
}

const inventoryItemForm = document.getElementById('inventoryitem-form');

if (inventoryItemForm) {
  ReactDOM.render(<InventoryItemFrom />, inventoryItemForm);
}

const lostItemForm = document.getElementById('lostitem-form');

if (lostItemForm) {
  ReactDOM.render(<LostItemForm />, lostItemForm);
}

const eventForm = document.getElementById('event-form');

if (eventForm) {
  ReactDOM.render(<EventForm />, eventForm);
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
