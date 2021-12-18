const mongoose = require('mongoose');
const User = require('../models/usermodel');
const passportLocalMong = require('passport-local-mongoose');

let WalletSchema = new mongoose.Schema({
  coins: [{ coin_id: String, amount: Number }],
  created: { type: Date, default: Date.now },
  owner: { id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } },
});

WalletSchema.plugin(passportLocalMong);
module.exports = mongoose.model('Wallet', WalletSchema);
