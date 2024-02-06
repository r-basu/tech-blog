const express = require("express");
const router = express.Router();
const { User, Post, Comment } = require("../models");

// GET ALL comments for PostID
router.get(`/:postId`, (req, res) => {
  Comment.findAll({
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      Post,
    ],
    where: {
      PostId: req.params.postId,
    },
  })
    .then((dbComments) => {
      res.json(dbComments);
    })
    .catch((err) => {
      res.status(500).json({ msg: "Error retrieving comments", err });
    });
});

// CREATE comment
router.post("/:postId", (req, res) => {
  Comment.create({
    contents: req.body.contents,
    UserId: req.session.user.id,
    PostId: req.params.postId,
  })
    .then((newComment) => {
      res.json(newComment);
    })
    .catch((err) => {
      res.status(500).json({ msg: "Error creating comment", err });
    });
});

module.exports = router;
