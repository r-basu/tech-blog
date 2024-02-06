let postsContainer = document.getElementById("posts-container");
let fetchedPosts;

fetch("/api/posts")
  .then((res) => res.json())
  .then((posts) => {
    fetchedPosts = posts;
    renderPosts();
  })
  .catch((err) => {
    console.log("Error fetching posts", err);
  });

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
        postId = e.target.parentNode.id;
        renderPost(postId);
      }
    });
  });
};

const renderPost = (id) => {
    if (id === '') {
        return
    } else {
        localStorage.setItem('setPostId', id)
        location.replace('/')
    }
}