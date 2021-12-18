var express = require('express');
var router = express.Router();

/* list of top 50 coins */
router.get('/coins', function (req, res, next) {
  res.send('list of top 50 coins');
});

/* get single coin */
router.get('/coin/:coin_id', function (req, res, next) {
  try {
    console.log(req.params.coin_id);
    res.send('get single info for ' + req.params.coin_id);
  } catch (e) {
    res.type(404);
    res.send(
      'Wrong or Missing Coin ID Try again with token name ex:bitcoin not btc'
    );
  }
});

module.exports = router;
