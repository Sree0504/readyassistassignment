const express= require('express');
const app = express();
// internal module imports
app.use('/users',  require('./users'));
module.exports = app;