const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const newsRoutes = require('./routes/route');
const path = require('path');
const app = express();
const PORT = 3000;
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/ethiopian-news-hub');
app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', newsRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the News API');
});
  
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
