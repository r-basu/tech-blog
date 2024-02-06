const express = require("express");
const router = express.Router();

// Home
router.get("/", (req, res) => {
  let isLoggedIn = false;
  if (req.session.user) {
    isLoggedIn = true;
  }
  res.render("home", { isLoggedIn });
});

// Login
router.get("/login", (req, res) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    res.render("login");
  }
});

// Individual Post
router.get("/post/:id", (req, res) => {
  res.render("post");
});

module.exports = router;
