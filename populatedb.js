const mongoose = require('mongoose');
const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');

async function populateDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/blog');

    // Create sample users
    const users = [
      { username: 'john', email: 'hello@kitty.com', password: 'password123' },
      { username: 'jane', email: 'hell@kitty.com', password: 'password456' }
    ];
    const createdUsers = await User.insertMany(users);

    // Create sample posts
    const posts = [
      { title: 'First post', content: 'This is the content of the first post', author: createdUsers[0]._id },
      { title: 'Second post', content: 'This is the content of the second post', author: createdUsers[1]._id },
      { title: 'Third post', content: 'This is the content of the third post', author: createdUsers[0]._id }
    ];
    const createdPosts = await Post.insertMany(posts);

    // Create sample comments
    const comments = [
      { content: 'Nice post!', post_id: createdPosts[0]._id, author_name: 'Mark', author_email: 'mark@example.com' },
      { content: 'I enjoyed reading this', post_id: createdPosts[1]._id, author_name: 'Sarah', author_email: 'sarah@example.com' }
    ];
    await Comment.insertMany(comments);

    console.log('Sample data inserted successfully!');
  } catch (err) {
    console.error(err.message);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}

populateDB();
