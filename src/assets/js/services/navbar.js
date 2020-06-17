async function getNavBarMetadata() {
  const post = await fetch('/api/navbar/metadata');
  return post.json();
}

export default {
  getNavBarMetadata,
};
