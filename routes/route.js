const express = require('express');
const router = express.Router();
const passport = require('passport');
const News = require('../models/EthioNewsModel');
const NewsStation = require('../models/newsStationModel');
const UserModel = require('../models/usermodel');
const SportNews = require('../models/SportModel')
const EntertainmentNews = require('../models/EntertainmentModel')
const BusinessNews = require('../models/BusinessModel')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
require('dotenv').config()

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
              const user = await UserModel.findOne({ username: username});
              console.log(user);
              if (user) {
                return res.json({ success: true, message: 'Login successful' });

            } else {
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
  
          
          
      } catch (error) {
          return res.status(401).json({"message": "Invalid credentials", "success": false});
      }
  }
  
  // register User
  router.post('/register', async (req, res) => {
      const { name,age,address,gender, username, email, password } = req.body;
      return autoSave({ name,age,address,gender, username, email, password }, res, 'register');
  });
  
  // Login User
  router.post('/login', async (req, res) => {
      const { username, password,email} = req.body;
      return autoSave({ username, password,email}, res, 'login');
  });
  router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  
  router.get(
      '/auth/google/callback',
      passport.authenticate('google', {
          successRedirect:'http://localhost:3000/index.html' ,
          failureRedirect: 'http://localhost:3000',
      })
  );
  router.post('/newsstation', async (req, res) => {
      try {
        const { stationName, socialMediaLinks } = req.body;
    
        const newsStation = new NewsStation({
        
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
    router.post('/news', async (req, res) => {
      try {
        const { title, news, source } = req.body;
    
        const newsArticle = new News({
        
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
    router.post('/sportnews', async (req, res) => {
      try {
        const { title, news, source } = req.body;
    
        const newsArticle = new SportNews({
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
    router.post('/businessnews', async (req, res) => {
      try {
        const { title, news, source } = req.body;
    
        const newsArticle = new BusinessNews({
      
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
    router.post('/entertainmentnews', async (req, res) => {
      try {
        const { title, news, source } = req.body;
    
        const newsArticle = new EntertainmentNews({
        
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
      router.get('/searchnews', async (req, res) => {
      const { title } = req.query;
    
      try {
        const searchResults = await News.find({ title: { $regex: new RegExp(title, 'i') } });
    
        return res.json({ success: true, results: searchResults });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
    });
    router.get('/searchsport', async (req, res) => {
      const { title } = req.query;
    
      try {
        // Using a regular expression to perform a case-insensitive search
        const searchResults = await SportNews.find({ title: { $regex: new RegExp(title, 'i') } });
    
        return res.json({ success: true, results: searchResults });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
    });
    router.get('/searchbusiness', async (req, res) => {
      const { title } = req.query;
    
      try {
        const searchResults = await BusinessNews.find({ title: { $regex: new RegExp(title, 'i') } });
    
        return res.json({ success: true, results: searchResults });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
    });
    router.get('/searchentertainment', async (req, res) => {
      const { title } = req.query;
    
      try {
        const searchResults = await EntertainmentNews.find({ title: { $regex: new RegExp(title, 'i') } });
    
        return res.json({ success: true, results: searchResults });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
    });

module.exports.CheckEmail = CheckEmail;
module.exports.router = router;
module.exports.autoSave = autoSave;