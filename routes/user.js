var express = require('express');
var router = express.Router();
const passport = require('passport'),
  User = require('../models/usermodel');

/* register */
router.post('/register', (req, res) => {
  let newUser = new User({
    username: req.body.username,
  });

  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      res.type(401);
      res.send('Something wrong Try Again');
    }
    passport.authenticate('local')(req, res, () => {
      res.type(200);
      res.send(
        'Success, Now Login with same creadentials and use login token other token required operations'
      );
    });
  });
});

// login

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send('Welcome' + req.user.username);
});

module.exports = router;
