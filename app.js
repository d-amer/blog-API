var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const User = require("./models/user");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRoutes');

const postsRouter = require('./routes/postRoutes');
const commentsRouter = require('./routes/commentRoutes');
const authRouter = require('./routes/authRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

async function run() {
  try {
      await mongoose.connect("mongodb://127.0.0.1:27017/blog");
      const users = await User.find();
      console.log("Connected!")
      console.log(users);

  } catch (err) {
      console.error(err.message);
  }
}

run();

app.use('/', authRouter);
app.use('/', postsRouter);
app.use('/', usersRouter);
app.use('/', indexRouter);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
