const postTitle = document.getElementById("post-title");
const postUser = document.getElementById("post-user");
const postContents = document.getElementById("post-contents");
const updatePostTitle = document.getElementById("update-post-title");
const updatePostContent = document.getElementById("update-post-content");
const updatePostBtn = document.getElementById("update-post-btn");
const deletePostBtn = document.getElementById("delete-post-btn");
let fetchedPost;

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

//SHOW USER POSTS
const renderPost = () => {
  // trim date length
  const date = fetchedPost[0].createdAt.slice(0, 10);

  // Add fetched data to html
  postTitle.textContent = `${fetchedPost[0].title}`;
  postUser.textContent = `Posted by ${fetchedPost[0].User.username} on ${date}`;
  postContents.textContent = `${fetchedPost[0].contents}`;
};

// UPDATE POST
updatePostBtn.addEventListener("click", () => {
  if (updatePostTitle.value === "") {
    alert(`Please fill in post title`);
    return;
  } else if (updatePostContent.value === "") {
    alert(`Please fill in post content`);
    return;
  } else {
    fetch(`/api/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({
        title: updatePostTitle.value,
        contents: updatePostContent.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          location.href = "/dashboard";
        } else {
          console.log("Error updating post");
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }
});

// DELETE POST
deletePostBtn.addEventListener("click", () => {
  fetch(`/api/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        location.href = "/dashboard";
      } else {
        console.log("Error deleting post");
      }
    })
    .catch((err) => {
      console.log("Error", err);
    });
});
