async function getEntity(entity, id) {
  const post = await fetch(`/api/retrieve/${entity}/${id}`);
  return post.json();
}
async function getOrganizationList() {
  const post = await fetch('/api/retrieve/orglist');
  return post.json();
}
async function getUser() {
  const post = await fetch('/api/retrieve/user');
  return post.json();
}

async function getComments(eventId) {
  const post = await fetch(`/api/retrieve/get/comments/${eventId}`);
  return post.json();
}

async function postComment(comment, eventId) {
  const { content } = comment;
  await fetch(`/api/retrieve/post/comments/${eventId}`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  });
}

export {
  getEntity,
  getOrganizationList,
  getUser,
  getComments,
  postComment,
};
