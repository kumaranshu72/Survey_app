const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./models/User');
require('./services/passport');
const keys = require('./config/keys');

var app = express();

app.use(
  cookieSession({
    maxAge : 24 * 30 * 3600 * 1000,
    keys : [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodbURI);
require("./routes/authRoutes")(app);

const PORT =process.env.PORT || 3000;
app.listen(PORT);
