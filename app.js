require('dotenv').config();
const express = require('express'),
  app = express(),
  createError = require('http-errors'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  bodyParser = require('body-parser', { useNewUrlParser: true }),
  expressSanitizer = require('express-sanitizer'),
  expressSession = require('express-session'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  passportLocal = require('passport-local'),
  passportLocalMong = require('passport-local-mongoose'),
  User = require('./models/usermodel'),
  Wallet = require('./models/walletmodel'),
  indexRouter = require('./routes/index'),
  usersRouter = require('./routes/user'),
  wallet = require('./routes/wallet'),
  crypto = require('./routes/crypto');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use(wallet);
app.use(crypto);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
