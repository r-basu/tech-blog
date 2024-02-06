const postsContainer = document.getElementById("posts-container");
const postForm = document.getElementById("post-form");
const postSubmit = document.getElementById("submit");
let fetchedPosts;

fetch("/api/posts/session")
  .then((res) => res.json())
  .then((posts) => {
    fetchedPosts = posts;
    renderPosts();
  })
  .catch((err) => {
    console.log("Error fetching posts", err);
  });

//DISPLAY POSTS
const renderPosts = () => {
  for (let post of fetchedPosts) {
    // trim date length
    const date = post.createdAt.slice(0, 10);

    //initial individual post container
    const postContainer = document.createElement("div");
    postContainer.classList.add("post");
    postContainer.setAttribute("id", `${post.id}`);
    postsContainer.appendChild(postContainer);

    //post title
    const postTitle = document.createElement("h3");
    postTitle.textContent = `${post.title}`;
    postContainer.appendChild(postTitle);

    //post user
    const postUser = document.createElement("p");
    postUser.textContent = `Posted by ${post.User.username} on ${date}`;
    postContainer.appendChild(postUser);

    //post content
    const postContents = document.createElement("p");
    postContents.textContent = `${post.contents}`;
    postContainer.appendChild(postContents);
  }

  posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    post.addEventListener("click", (e) => {
      if (e.target.parentNode.className === `post`) {
        clickedPostId = e.target.parentNode.id;
        goToPost(clickedPostId);
      }
    });
  });
};

const goToPost = (postId) => {
  localStorage.setItem("postId", postId);
  location.replace(`/userpost/${postId}`);
};

// ADDING POST
postForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const postObj = {
    title: document.getElementById("post-title").value,
    contents: document.getElementById("post-content").value,
  };
  addPost(postObj);
});

const addPost = async (postObj) => {
  fetch("/api/posts/", {
    method: "POST",
    body: JSON.stringify(postObj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        location.reload();
      } else {
        console.log("Error adding post");
      }
    })
    .catch((err) => {
      console.log("Error", err);
    });
};
