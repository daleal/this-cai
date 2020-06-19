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
export {
  getEntity,
  getOrganizationList,
  getUser,
};
