import React, { Component } from 'react';

import ChatIndexButton from './components/ChatIndexButton';

import chatService from '../../services/chat';

export default class ChatIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      users: null,
      anonymous: null,
    };

    this.fetchChatsMetadata = this.fetchChatsMetadata.bind(this);
  }

  componentDidMount() {
    this.fetchChatsMetadata();
  }

  async fetchChatsMetadata() {
    this.setState({ loading: true });
    const chatsMetadata = await chatService.getChatsMetadata();
    const { users, anonymous } = chatsMetadata;
    this.setState({ users, anonymous, loading: false });
  }

  render() {
    const { loading, users, anonymous } = this.state;

    if (loading) {
      return <div className="dual-ring-spinner" />;
    }

    return (
      <>
        <ChatIndexButton
          key={anonymous.url}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...anonymous}
        />
        {
          users.map((user) => (
            <ChatIndexButton
              key={user.id}
              url={`/messages/chat/${user.id}`}
              text={`${user.firstName} ${user.lastName}`}
              image={user.image}
            />
          ))
        }
      </>
    );
  }
}
