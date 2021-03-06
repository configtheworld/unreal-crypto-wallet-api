var express = require('express');
var router = express.Router();

const api_docs = {
  name: 'Unreal Crypto Wallet API',
  desc: 'This is Public API interface for Crypto Currencies and Fake Wallet Account for Tracking The Stock Market',
  author: 'Erkin Ture - Gazi University Distributed Systems Project',
  github: 'https://github.com/configtheworld/unreal-crypto-wallet-api',
  database: 'Mongo DB',
  structure: 'Api and database are communicated containers',
  live: 'https://unreal-crypto-wallet-api.herokuapp.com/',
  endpoints: [
    {
      'GET /': {
        desc: 'Unreal Crypto Wallet API Documentation',
        requestparams: '-',
        requestbody: '-',
        resonseTypes: [200],
      },
    },
    {
      'GET /coins': {
        desc: 'list of top 50 coins',
        requestparams: '-',
        requestbody: '-',
        resonseTypes: [200, 500],
      },
    },
    {
      'GET /coin/:coin_id': {
        desc: 'get single coin',
        requestparams: 'coin_id ex:btc, algo, eth, mina',
        requestbody: '-',
        resonseTypes: [200, 500],
      },
    },
    {
      'GET /wallet?token=YOUR_LOGIN_TOKEN': {
        desc: 'Show User Wallet',
        requestparams: 'token',
        requestbody: '',
        resonseTypes: [200, 401, 500],
      },
    },
    {
      'POST /wallet?token=YOUR_LOGIN_TOKEN': {
        desc: 'register for create fake wallet',
        requestparams: 'token',
        requestbody: '',
        resonseTypes: [200, 401, 500],
      },
    },
    {
      'PATCH /wallet?token=YOUR_LOGIN_TOKEN': {
        desc: 'Add Fake Currencies to Your Wallet',
        requestparams: 'token',
        requestbody: { coin_id: 'algorand', amount: 200 },
        resonseTypes: [200, 500],
      },
    },
    {
      'POST /user/register': {
        desc: 'register for create fake wallet',
        requestparams: '-',
        requestbody: { username: 'username', password: 'password' },
        resonseTypes: [200, 401, 500],
      },
    },
    {
      'POST /user/login': {
        desc: 'login for fake wallet info',
        requestparams: '-',
        requestbody: { username: 'username', password: 'password' },
        resonseTypes: [200, 401, 500],
      },
    },
  ],
  some_exapmle_coins: [
    {
      id: 'btc',
      name: 'Bitcoin',
    },
    {
      id: 'etc',
      name: 'Ethereum',
    },
    {
      id: 'algo',
      name: 'Algorand',
    },
  ],
};

/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(200).send(api_docs);
});

module.exports = router;
