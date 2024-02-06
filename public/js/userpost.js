const postTitle = document.getElementById("post-title");
const postUser = document.getElementById("post-user");
const postContents = document.getElementById("post-contents");
let fetchedPost;
let fetchedComments;

const localPostId = localStorage.getItem("postId");
const postId = JSON.parse(localPostId);

fetch(`/api/posts/${postId}`)
  .then((res) => res.json())
  .then((post) => {
    fetchedPost = post;
    renderPost();
  })
  .catch((err) => {
    console.log("Error fetching posts", err);
  });

fetch(`/api/comments/${postId}`)
  .then((res) => res.json())
  .then((comments) => {
    fetchedComments = comments;
    renderComments();
  })
  .catch((err) => {
    console.log("Error fetching comments", err);
  });

  const renderPost = () => {
    // trim date length
    const date = fetchedPost[0].createdAt.slice(0, 10);
  
    // Add fetched data to html
    postTitle.textContent = `${fetchedPost[0].title}`;
    postUser.textContent = `Posted by ${fetchedPost[0].User.username} on ${date}`;
    postContents.textContent = `${fetchedPost[0].contents}`;
  };