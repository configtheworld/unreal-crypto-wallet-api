const express = require('express');
const router = express.Router();
const Wallet = require('../models/walletmodel');

/* Show User Wallet */
router.get('/wallet', async (req, res, next) => {
  try {
    if (req.query.token) {
      // TODO: calculate coin price
      const wallet = await Wallet.findOne({ owner: req.query.token });

      if (wallet.coins.length > 0) {
        let coin_query = '';

        await wallet.coins.map((coin) => {
          coin_query = coin.coin_id + ',';
        });
        /*
        const coin_obj = await axios_get(
          `/data/pricemulti?fsyms=${coin_query.slice(0, -1)}&tsyms=USD,TRY`
        );

        await wallet.coins.map((coin)=>{
        })
          */
        res.send(coin_query);
      } else {
        res.send(wallet);
      }
    } else {
      res
        .send(
          'Wrong or Missing Query Try again with login token as ?token=YOUR_LOGIN_TOKEN'
        )
        .status(400);
    }
  } catch (e) {
    res
      .send(
        'Wrong or Missing Query Try again with login token as ?token=YOUR_LOGIN_TOKEN'
      )
      .status(404);
  }
});

/* register for create fake wallet */
router.post('/wallet', function (req, res, next) {
  try {
    if (req.query.token) {
      let wallet = new Wallet({
        coins: [],
        owner: req.query.token,
      });
      wallet.save((err) => {
        if (err) {
          res.send('Wallet could not created');
        } else {
          res.send(
            'Your Wallet Created. If you have wallet already you can not create wallet'
          );
        }
      });
    } else {
      res
        .send(
          'Wrong or Missing Query Try again with login token as ?token=YOUR_LOGIN_TOKEN'
        )
        .status(400);
    }
  } catch (e) {
    res
      .send(
        'Wrong or Missing Query Try again with login token as ?token=YOUR_LOGIN_TOKEN'
      )
      .status(404);
  }
});

/* Add Fake Currencies to Your Wallet */
router.patch('/wallet', async (req, res, next) => {
  try {
    if (req.query.token) {
      if (req.body.coins) {
        await Wallet.findOneAndUpdate(
          { owner: req.query.token },
          {
            coins: req.body.coins,
          }
        );
        res.send('Your Wallet Updated');
      } else {
        res.send(
          'In order to add token please add coin info ex:{ coin_id: "algorand", amount: 200 } to request body'
        );
      }
    } else {
      res
        .send(
          'Wrong or Missing Query Try again with login token as ?token=YOUR_LOGIN_TOKEN'
        )
        .status(400);
    }
  } catch (e) {
    res
      .send(
        'Wrong or Missing Query Try again with login token as ?token=YOUR_LOGIN_TOKEN'
      )
      .status(404);
  }
});

module.exports = router;
