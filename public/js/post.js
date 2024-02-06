const postTitle = document.getElementById("post-title");
const postUser = document.getElementById("post-user");
const postContents = document.getElementById("post-contents");
const commentContent = document.getElementById("add-comment");
const commentSubmit = document.getElementById("submit");
let fetchedPost;
let fetchedComments;

const localPostId = localStorage.getItem("postId");
const postId = JSON.parse(localPostId);

fetch(`/api/posts/${postId}`)
  .then((res) => res.json())
  .then((post) => {
    fetchedPost = post;
    renderPost();
  });

fetch(`/api/comments/${postId}`)
  .then((res) => res.json())
  .then((comments) => {
    fetchedComments = comments;
    renderComments();
  });

const renderPost = () => {
  // trim date length
  const date = fetchedPost[0].createdAt.slice(0, 10);

  // Add fetched data to html
  postTitle.textContent = `${fetchedPost[0].title}`;
  postUser.textContent = `Posted by ${fetchedPost[0].User.username} on ${date}`;
  postContents.textContent = `${fetchedPost[0].contents}`;
};

const renderComments = () => {
  for (let comment of fetchedComments) {
    const commentContainer = document.getElementById("comment-container");
    const date = comment.createdAt.slice(0, 10);

    //comment contents
    const commentContents = document.createElement("p");
    commentContents.textContent = `${comment.contents}`;
    commentContainer.appendChild(commentContents);

    // comment user
    const commentUser = document.createElement("p");
    commentUser.textContent = `Comment left by ${comment.User.username} on ${date}`;
    commentContainer.appendChild(commentUser);
  }
};

commentSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(`/api/comments/${postId}`, {
    method: `POST`,
    body: JSON.stringify({ contents: commentContent.value }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      location.reload();
    } else {
      console.log("Error adding comment");
    }
  });
});
