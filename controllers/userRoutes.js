const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models");

//Create User
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((newUser) => {
      req.session.user = {
        id: newUser.id,
      };
      res.json(newUser);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error creating new user", err });
    });
});

//Login User
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((foundUser) => {
      if (
        !foundUser ||
        !bcrypt.compareSync(req.body.password, foundUser.password)
      ) {
        return res.status(401).json({ msg: "invalid login credentials" });
      }
      req.session.user = {
        id: foundUser.id,
        username: foundUser.username,
      };
      res.json(foundUser);
    })
    .catch((err) => {
      res.status(500).json({ msg: "Error!", err });
    });
});


//Logout User
router.get('/logout', (req,res) => {
    req.session.destroy();
    res.send("Successfully logged out")
})

module.exports = router;