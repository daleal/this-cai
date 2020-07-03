async function getChatsMetadata() {
  const chats = await fetch('/api/messages/cookies');
  return chats.json();
}

async function getChatMessages(id) {
  const messages = await fetch(`/api/messages/cookies/chat/${id}`);
  return messages.json();
}

async function getAnonymousMessagesMetadata() {
  const anonymous = await fetch('/api/messages/cookies/chat/anonymous');
  return anonymous.json();
}

async function sendMessage(id, content) {
  const response = await fetch(`/api/messages/cookies/chat/${id}/send`, {
    method: 'POST',
    body: JSON.stringify({
      content,
    }),
  });
  return response.json();
}

export default {
  getChatsMetadata,
  getChatMessages,
  getAnonymousMessagesMetadata,
  sendMessage,
};
