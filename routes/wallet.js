var express = require('express');
var router = express.Router();

/* register for create fake wallet (?token=YOUR_LOGIN_TOKEN) */
router.post('/wallet', function (req, res, next) {
  try {
    console.log(req.query.token);
    res.send('register for create fake wallet');
  } catch (e) {
    res.type(404);
    res.send(
      'Wrong or Missing Query Try again with login token as ?token=YOUR_LOGIN_TOKEN'
    );
  }
});

/* get single coin */
router.patch('/wallet', function (req, res, next) {
  try {
    console.log(req.query.token);
    console.log(req.body.coin);
    res.send('Add Fake Currencies to Your Wallet');
  } catch (e) {
    res.type(404);
    res.send(
      'Wrong or Missing Query Try again with login token as ?token=YOUR_LOGIN_TOKEN'
    );
  }
});

module.exports = router;
