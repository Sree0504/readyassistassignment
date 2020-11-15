const mongoose = require('mongoose');
const UserSchema = require('./collection');
module.exports = User =  mongoose.model('user', UserSchema);