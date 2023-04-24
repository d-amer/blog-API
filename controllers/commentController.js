const Comment = require("../models/comment");

exports.getComments = async (req, res) => {
    try {
      const comments = await Comment.find();
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

exports.createComment = async (req, res) => {
  const comment = new Comment({
    content: req.body.content,
    post_id: req.body.post_id,
    author_name: req.body.author_name,
    author_email: req.body.author_email,
    created_at: req.body.created_at
  });
  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
  
exports.deleteComment = async (req, res) => {
  try {
    const user = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    await comment.remove();
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};