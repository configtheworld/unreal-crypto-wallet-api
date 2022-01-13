var express = require('express');
const { axios_get } = require('../axios_rest');
const { find } = require('../models/usermodel');
var router = express.Router();
const Wallet = require('../models/walletmodel');
const User = require('../models/usermodel');

/* list of top 50 coins */
router.get('/coins', async (req, res, next) => {
  try {
    const users = await User.find();

    const wallets = await Wallet.find();

    const coin_list_obj = await axios_get(
      '/data/pricemulti?fsyms=BTC,ETH,ALGO,SOL,AVAX,SAND,MANA,MINA,LTC,EOS,BCH,LINK,TRX,ETC,BNB,SHIB,ADA,XLM,MOF,BSV,BTT,HT,DOT,KCS,NEO,USDT,XMR,ONT,DOGE,USDC,TRUE,PAX,AROM,SNM,LAMB,ZRX,ZEC,WAVES,RCN,DASHXTZ,TUSD,WINT,IOST,QTUM,MATIC,XRP,MTL,OGSP,CELR&tsyms=USD,TRY'
    );
    const coin_list = Object.entries(coin_list_obj.data).map((coin) => ({
      [coin[0]]: coin[1],
    }));
    if (users.length > 0 && wallets.length > 0) {
      res.send({
        info: 'Unreal Crypto Wallet API',
        users: users.length,
        wallets: wallets.length,
        coins: coin_list,
      });
    } else {
      res.send(coin_list);
    }
  } catch (err) {
    res.status(400).send({
      message:
        'Wrong or Missing Coin ID Try again with coin short name ex:BTC not bitcoin',
    });
  }
});

/* get single coin */
router.get('/coin/:coin_id', async (req, res, next) => {
  try {
    const users = await User.find();

    const wallets = await Wallet.find();

    const coin_obj = await axios_get(
      `/data/price?fsym=${req.params.coin_id}&tsyms=USD,TRY`
    );
    if (users.length > 0 && wallets.length > 0) {
      res.send({
        info: 'Unreal Crypto Wallet API',
        users: users.length,
        wallets: wallets.length,
        coin: coin_obj.data,
      });
    } else {
      res.send(coin_obj.data);
    }
  } catch (err) {
    res.status(400).send({
      message:
        'Wrong or Missing Coin ID Try again with coin short name ex:BTC not bitcoin',
    });
  }
});

module.exports = router;
