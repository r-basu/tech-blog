const express = require("express");
const router = express.Router();

// const htmlRoutes = require('./htmlRoutes')
// router.use('/', htmlRoutes)

const userRoutes = require("./userRoutes");
router.use("/api/users", userRoutes);

const postRoutes = require('./postRoutes')
router.use('/api/posts', postRoutes)

// const commentRoutes = require('./commentRoutes')
// router.use('/api/comments', commentRoutes)

module.exports = router;
