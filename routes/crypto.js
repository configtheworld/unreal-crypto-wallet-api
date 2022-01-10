var express = require('express');
const { axios_get } = require('../axios_rest');
var router = express.Router();

/* list of top 50 coins */
router.get('/coins', async (req, res, next) => {
  try {
    const coin_list_obj = await axios_get(
      '/data/pricemulti?fsyms=BTC,ETH,ALGO,SOL,AVAX,SAND,MANA,MINA,LTC,EOS,BCH,LINK,TRX,ETC,BNB,SHIB,ADA,XLM,MOF,BSV,BTT,HT,DOT,KCS,NEO,USDT,XMR,ONT,DOGE,USDC,TRUE,PAX,AROM,SNM,LAMB,ZRX,ZEC,WAVES,RCN,DASHXTZ,TUSD,WINT,IOST,QTUM,MATIC,XRP,MTL,OGSP,CELR&tsyms=USD,TRY'
    );
    const coin_list = Object.entries(coin_list_obj.data).map((coin) => ({
      [coin[0]]: coin[1],
    }));
    res.send(coin_list);
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
    const coin_obj = await axios_get(
      `/data/price?fsym=${req.params.coin_id}&tsyms=USD,TRY`
    );

    res.send(coin_obj.data);
  } catch (err) {
    res.status(400).send({
      message:
        'Wrong or Missing Coin ID Try again with coin short name ex:BTC not bitcoin',
    });
  }
});

module.exports = router;
