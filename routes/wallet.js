const express = require('express');
const router = express.Router();
const Wallet = require('../models/walletmodel');
const User = require('../models/usermodel');
/* Show User Wallet */
router.get('/wallet', async (req, res, next) => {
  try {
    if (req.query.token) {
      User.findById(req.query.token, (err, user) => {
        if (err) {
          res.send('Your Wallet Created.User Not Found');
        } else {
          Wallet.findOne({ owner: user }, (err, wallet) => {
            if (err) {
              res.send('Your Wallet Created.User Not Found');
            } else {
              res.send(wallet);
            }
          });
        }
      });
    } else {
      res
        .status(400)
        .send(
          'Wrong or Missing Query Try again with login token as ?token=YOUR_LOGIN_TOKEN'
        );
    }
  } catch (e) {
    res
      .status(404)
      .send(
        'Wrong or Missing Query Try again with login token as ?token=YOUR_LOGIN_TOKEN'
      );
  }
});

/* register for create fake wallet */
router.post('/wallet', async function (req, res, next) {
  try {
    if (req.query.token) {
      User.findById(req.query.token, (err, user) => {
        if (err) {
          res.send('Your Wallet Created.User Not Found');
        } else {
          let wallet = new Wallet({
            coins: [],
            owner: user,
          });
          wallet.save((err) => {
            if (err) {
              res.send('Wallet could not created' + err.message);
            } else {
              res.send('Your Wallet Created.');
            }
          });
        }
      });
    } else {
      res
        .status(400)
        .send(
          'Wrong or Missing Query Try again with login token as ?token=YOUR_LOGIN_TOKEN'
        );
    }
  } catch (e) {
    res
      .status(404)
      .send(
        'Wrong or Missing Query Try again with login token as ?token=YOUR_LOGIN_TOKEN'
      );
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
        res.status(200).send('Your Wallet Updated');
      } else {
        res.send(
          'In order to add token please add coin info ex:{ coin_id: "algorand", amount: 200 } to request body'
        );
      }
    } else {
      res
        .status(400)
        .send(
          'Wrong or Missing Query Try again with login token as ?token=YOUR_LOGIN_TOKEN'
        );
    }
  } catch (e) {
    res
      .status(404)
      .send(
        'Wrong or Missing Query Try again with login token as ?token=YOUR_LOGIN_TOKEN'
      );
  }
});

module.exports = router;

/**
 *       if (wallet.coins.length > 0) {
        let coin_query = '';

        await wallet.coins.map((coin) => {
          coin_query = coin.coin_id + ',';
        });
        
        const coin_obj = await axios_get(
          `/data/pricemulti?fsyms=${coin_query.slice(0, -1)}&tsyms=USD,TRY`
        );

        await wallet.coins.map((coin)=>{
        })
          
 */
