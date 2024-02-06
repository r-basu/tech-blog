const express = require("express");
const router = express.Router();
const { User, Post, Comment } = require("../models");

// GET ALL posts
router.get("/", (req, res) => {
  Post.findAll({
    include: [User, Comment],
  })
    .then((dbPosts) => {
      res.json(dbPosts);
    })
    .catch((err) => {
      res.status(500).json({ msg: "Error retrieving all posts", err });
    });
});

// Find posts by session user
router.get("/session/", (req, res) => {
  console.log(req.session.user);
  Post.findAll({
    include: [User, Comment],
    where: {
      UserId: req.session.user.id,
    },
  })
    .then((dbPosts) => {
      res.json(dbPosts);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ msg: "Error retrieving posts on logged in user", err });
    });
});

// Find post by PostID
// Cannot place above /xxxx routes otherwise parameter will run instead
router.get("/:postId", (req, res) => {
  console.log(req.session.user.id);
  Post.findAll({
    where: {
      id: req.params.postId,
    },
    include: [User, Comment],
  })
    .then((dbPost) => {
      res.json(dbPost);
    })
    .catch((err) => {
      res.status(500).json({ msg: "Error finding post by PostId", err });
    });
});

// Create post
router.post("/", (req, res) => {
  Post.create({
    title: req.body.title,
    contents: req.body.contents,
    UserId: req.session.user.id,
  })
    .then((dbPost) => {
      res.json(dbPost);
    })
    .catch((err) => {
      res.status(500).json({ msg: "Error creating post", err });
    });
});

// Update post
router.put("/:postId", (req, res) => {
  Post.update(
    {
      title: req.body.title,
      contents: req.body.contents,
    },
    {
      where: {
        id: req.params.postId,
      },
    }
  )
    .then((updatePost) => {
      res.json(updatePost);
    })
    .catch((err) => {
      res.status(500).json({ msg: "Error updating post", err });
    });
});

// Delete post
router.delete("/:postId", (req, res) => {
  Post.destroy({
    where: {
      id: req.params.postId,
    },
  })
    .then((deletePost) => {
      res.json("Post has been deleted");
    })
    .catch((err) => {
      res.status(500).json({ msg: "Error deleting post", err });
    });
});

module.exports = router;
