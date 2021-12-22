var express = require('express');
var router = express.Router();

/* Show User Wallet */
router.get('/wallet', function (req, res, next) {
  try {
    if (req.query.token) {
      res.send('Show wallet for user no ' + req.query.token);
      //TODO: find by id with token and find ref wallet
    } else {
      res.send(
        'Wrong or Missing Query Try again with login token as ?token=YOUR_LOGIN_TOKEN'
      );
    }
  } catch (e) {
    res.type(404);
    res.send(
      'Wrong or Missing Query Try again with login token as ?token=YOUR_LOGIN_TOKEN'
    );
  }
});

/* register for create fake wallet */
router.post('/wallet', function (req, res, next) {
  try {
    if (req.query.token) {
      res.send(
        'register for create fake wallet for user no ' + req.query.token
      );
      //TODO: create wallet with user id with ref
    } else {
      res.send(
        'Wrong or Missing Query Try again with login token as ?token=YOUR_LOGIN_TOKEN'
      );
    }
  } catch (e) {
    res.type(404);
    res.send(
      'Wrong or Missing Query Try again with login token as ?token=YOUR_LOGIN_TOKEN'
    );
  }
});

/* Add Fake Currencies to Your Wallet */
router.patch('/wallet', function (req, res, next) {
  try {
    if (req.query.token) {
      if (req.body.coins) {
        console.log(req.body.coins);
        res.send(
          'Add Fake ' + req.body.coin + ' for user no ' + req.query.token
        );
        //TODO: update wallet by id with token and select ref wallet
      } else {
        res.send(
          'In order to add token please add coin info ex:{ coin_id: "algorand", amount: 200 } to request body'
        );
      }
    } else {
      res.send(
        'Wrong or Missing Query Try again with login token as ?token=YOUR_LOGIN_TOKEN'
      );
    }
  } catch (e) {
    res.type(404);
    res.send(
      'Wrong or Missing Query Try again with login token as ?token=YOUR_LOGIN_TOKEN'
    );
  }
});

module.exports = router;
