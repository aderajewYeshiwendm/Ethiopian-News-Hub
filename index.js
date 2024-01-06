const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const UserModel = require('./models/usermodel');
const News = require('./models/newsModel')
const NewsStation = require('./models/newsStation')
const Search = require('./models/searchSchema')
require('dotenv').config()
const app = express();
const PORT = 3000;
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/ethiopian-news-hub');
app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
      {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: process.env.GOOGLE_CALLBACK_URL,
          scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("Google Authentication Response:", { accessToken, refreshToken, profile });

        try{
          const existingUser = await UserModel.findOne({ googleId: profile.id});
          if(existingUser){
            return done(null,existingUser);
          }
        
          const newUser = await UserModel.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
          });
          return done(null, newUser);
      }catch(error){
        return done(error,null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
// Function to Check email format
function CheckEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to handle authentication and user data saving
async function autoSave({ name,age,gender,address, username, email, password, googleId }, res, action) {
    try {

        // Check if email is already registered during register
        if (action === 'register') {
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'Email already registered' });
            }
        }

        // Check if user exists during login
        if (action === 'login') {
            const user = await UserModel.findOne({$or: [{ username, password }, { email }, { googleId }],});
            if (!user && user.username !== username && user.password !== password) {
                return res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
        }

        // Create new user during register
        if (action === 'register' || action == 'google') {
          if (action === 'register' && (!password || !username)) {
            return res.status(400).json({ success: false, message: 'Password and username are required for registration' });
          }
          const hashedPassword = await bcrypt.hash(password, 10); // Adjust the saltRounds as needed

            const newUser = await UserModel.create({ name,age,gender,address,username, email, password: hashedPassword,googleId });
            // Check email format
        if (!CheckEmail(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format' });
        }
            return res.json({ success: true, message: 'User registered successfully', user: newUser });
        }

        // Authenticate user during login
        if (action === 'login') {
            return res.json({ success: true, message: 'Login successful' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: `Error ${action} user`, error: error.message });
    }
}

// register User
app.post('/register', async (req, res) => {
    const { name,age,address,gender, username, email, password } = req.body;
    return autoSave({ name,age,address,gender, username, email, password }, res, 'register');
});

// Login User
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    return autoSave({ username, password }, res, 'login');
});
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        successRedirect:'http://localhost:3000/auth/google/callback' ,
        failureRedirect: 'http://localhost:3000',
    })
);
app.post('/newsstation', async (req, res) => {
    try {
      const { stationId, stationName, socialMediaLinks } = req.body;
  
      const newsStation = new NewsStation({
        stationId,
        stationName,
        socialMediaLinks,
      });
  
      await newsStation.save();
  
      res.json(newsStation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // API endpoint to create a News
  app.post('/news', async (req, res) => {
    try {
      const { newsId, title, news, source } = req.body;
  
      const newsArticle = new News({
        newsId,
        title,
        news,
        source,
      });
  
      await newsArticle.save();
  
      res.json(newsArticle);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // API endpoint to create a Search with references to News and NewsStation
  app.get('/search', async (req, res) => {
    try {
      const { userId, user, stationId, newsId } = req.body;
  
      const search = new Search({
        userId,
        user,
        stationId,
        news: newsId,
      });
  
      await search.save();
  
      res.json(search);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
