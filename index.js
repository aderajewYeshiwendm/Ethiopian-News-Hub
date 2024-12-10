const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const router = require('./routes/reaction').router;
const root = require('./routes/registration').router;
const rooter = require('./routes/route').router;
const path = require('path');
const app = express();
const PORT = 3000;
// how to use cors
const cors = require('cors');
app.use(cors());
require('dotenv').config()

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/ethiopian-news-hub');
app.use(session({
  secret: process.env.secret,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);
app.use('/', root);
app.use('/', rooter);

app.get('/', (req, res) => {
  res.send('/index.html');
});
  
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
