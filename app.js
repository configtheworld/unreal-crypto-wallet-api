require('dotenv').config();
const express = require('express'),
  app = express(),
  createError = require('http-errors'),
  path = require('path'),
  logger = require('morgan'),
  bodyParser = require('body-parser', { useNewUrlParser: true }),
  expressSanitizer = require('express-sanitizer'),
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

// Mongo Database
mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb+srv://' + process.env.LINK + '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB configed');
  })
  .catch((err) => {
    console.log('ERROR:', err.message);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use(wallet);
app.use(crypto);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());

app.locals.moment = require('moment');

//local strategy
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
  res.send({ status: err.status, stack: err.stack });
});

module.exports = app;
