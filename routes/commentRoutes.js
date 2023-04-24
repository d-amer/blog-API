const express = require("express");
const commentController = require("../controllers/commentController");
const router = express.Router();


router.post(
    "/posts/:postId/comments",
   commentController.createComment
);

router.get(
    "/posts/:postId/comments/",
   commentController.getComments

);

router.delete(
    "/posts/:postId/comments/:commentId",
    commentController.deleteComment
)

module.exports = router;