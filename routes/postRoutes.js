const express = require("express");
const postController = require("../controllers/postController");
const passport = require("passport");
const router = express.Router();
const bcrypt = require('bcryptjs');


router.post(
    "/posts/new",
    postController.createPost
  );

router.get(
    "/posts",
    postController.getPosts
);

router.get(
    "/posts/:id",
    postController.getPostById
);

router.delete(
    "/posts/delete/:id",
    postController.deletePost
)

module.exports = router;