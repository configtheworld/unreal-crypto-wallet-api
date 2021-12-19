const mongoose = require('mongoose');
const passportLocalMong = require('passport-local-mongoose');

let UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

UserSchema.plugin(passportLocalMong);

module.exports = mongoose.model('User', UserSchema);
