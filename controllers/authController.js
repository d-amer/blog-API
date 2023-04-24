const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const authMiddleware = require('../middleware/authMiddleware');
const { body, validationResult } = require("express-validator");
const User = require('../models/user');

exports.signup = (req, res, next) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  User.find({email: req.body.email })
      .exec()
      .then(users => { 
        if(users.length >= 1) {
          return res.status(409).json({
            message: "Email already taken"
          })
        }
        else {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    user.save()
      .then(() => {
        const token = jwt.sign(
          { email: user.email, userId: user._id },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        res.status(201).json({ message: 'User created', token });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  });
}
})
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'Auth failed' });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({ message: 'Auth failed' });
        }
        if (result) {
          const token = jwt.sign(
            { email: user.email, userId: user._id },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
          );
          return res.status(200).json({
            message: 'Auth successful',
            token: token
          });
        }
        res.status(401).json({ message: 'Auth failed' });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
