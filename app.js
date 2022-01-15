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
var debug = require('debug')('unreal-crypto-wallet-api:server');
var http = require('http');
var compression = require('compression');

// Mongo Database

//Set up default mongoose connection
var mongoDB = 'mongodb://mongo:27017';
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('DB configed');
  })
  .catch((err) => {
    console.log('ERROR:', err.message);
  });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/*
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
*/
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use(wallet);
app.use(crypto);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
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

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
