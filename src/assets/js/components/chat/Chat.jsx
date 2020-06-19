import React, { Component } from 'react';

import ChatMessage from './components/ChatMessage';
import ChatSender from './components/ChatSender';

import chatService from '../../services/chat';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userId: null,
      isCAi: false,
      messages: null,
    };

    this.fetchMetadata = this.fetchMetadata.bind(this);
    this.fetchChatMessages = this.fetchChatMessages.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.fetchMetadata();

    // Re-fetch messages every second
    this.interval = setInterval(
      async () => { await this.autoFetchChatMessages(); },
      1000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = null;
  }

  async fetchMetadata() {
    this.setState({ loading: true });
    const $isCAiContainer = document.getElementById('chat-is-cai');
    const $idContainer = document.getElementById('chat-with');
    const userId = $idContainer.innerText;
    const isCAi = $isCAiContainer.innerText === 'true';

    const messages = await this.fetchChatMessages(userId);

    $isCAiContainer.remove();
    $idContainer.remove();

    this.setState({
      userId, isCAi, messages, loading: false,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async fetchChatMessages(userId) {
    const chatMessages = await chatService.getChatMessages(userId);
    const { messages } = chatMessages;

    return messages;
  }

  async autoFetchChatMessages() {
    const { userId } = this.state;
    const chatMessages = await this.fetchChatMessages(userId);

    this.setState(() => ({
      messages: chatMessages,
    }));
  }

  async sendMessage(content) {
    try {
      const { userId } = this.state;
      const response = await chatService.sendMessage(userId, content);
      this.setState((state) => ({
        messages: [...state.messages, response.message],
      }));
      return true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Oops... Error sending message...');
      return false;
    }
  }

  render() {
    const { loading, messages, isCAi } = this.state;

    if (loading) {
      return <div className="dual-ring-spinner" />;
    }

    return (
      <div className="chat">
        {
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              // negated XOR operation, pretty genious
              isOwner={!(message.caiMessage ? !isCAi : isCAi)}
            />
          ))
        }

        <ChatSender sender={this.sendMessage} />

      </div>
    );
  }
}
