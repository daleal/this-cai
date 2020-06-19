import React, { Component } from 'react';

import AnonymousMessagesButton from './components/AnonymousMessagesButton';

import chatService from '../../services/chat';

export default class AnonymousMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      anonymous: null,
    };

    this.fetchAnonymousMessagesMetadata = this.fetchAnonymousMessagesMetadata.bind(this);
  }

  componentDidMount() {
    this.fetchAnonymousMessagesMetadata();
  }

  async fetchAnonymousMessagesMetadata() {
    this.setState({ loading: true });
    const anonymousMessagesMetadata = await chatService.getAnonymousMessagesMetadata();
    const { anonymous } = anonymousMessagesMetadata;
    this.setState({ anonymous, loading: false });
  }

  render() {
    const { loading, anonymous } = this.state;

    if (loading) {
      return <div className="dual-ring-spinner" />;
    }

    return (
      <div className="columns wrap">
        {
          anonymous.map((anonymousPerson) => (
            <AnonymousMessagesButton
              key={anonymousPerson.id}
              url={`/messages/${anonymousPerson.id}/show`}
              text={anonymousPerson.content}
            />
          ))
        }
      </div>
    );
  }
}
