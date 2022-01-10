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
      res.status(500).send('Something wrong Try Again');
    }
    passport.authenticate('local')(req, res, () => {
      res
        .status(200)
        .send(
          'Success, Now Login with same creadentials and use login token other token required operations'
        );
    });
  });
});

// login

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send({
    message:
      'Welcome ' +
      req.user.username +
      ', you can user token below in order to make operation with user token query parameters',
    token: req.user._id,
  });
});

module.exports = router;
