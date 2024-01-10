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
  async function autoSave({ name,age,gender,address, username, email, password, googleId,role }, res, action) {
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
              if (user) {
                if (user.role === 'admin') {
                  // Redirect the admin to the CRUD page
                  return res.json({
                      success: true,
                      message: 'Login successful',
                      redirectUrl: '/admin/crud', // to the CRUD page
                  });
              } else {
                  // For regular users 
                  return res.json({ success: true, message: 'Login successful' });
              }
            } else {
                return res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
            
  
      } 
          if (action === 'register') {
            if (action === 'register' && (!password || !username)) {
              return res.status(400).json({ success: false, message: 'Password and username are required for registration' });
            }
            const hashedPassword = await bcrypt.hash(password, 10); // Adjust the saltRounds as needed
  
              const newUser = await UserModel.create({ name,age,gender,address,username, email, password: hashedPassword,googleId,role });
              // Check email format
          if (!CheckEmail(email)) {
              return res.status(400).json({ success: false, message: 'Invalid email format' });
          }
              return res.json({ success: true, message: 'User registered successfully', user: newUser });
          }
          if (action === 'google') {
            const username = generateUniqueUsername(user.email); 
            const hashedPassword = await bcrypt.hash(password, 10); // Adjust the saltRounds as needed

            await UserModel.create({ ...user, username,password:hashedPassword });
        }
          
          
      } catch (error) {
          return res.status(401).json({"message": "Invalid credentials", "success": false});
      }
  }
  
  router.post('/register', async (req, res) => {
      const { name,age,address,gender, username, email, password,role } = req.body;
      return autoSave({ name,age,address,gender, username, email, password,role }, res, 'register');
  });
  
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
    router.get('/news', async (req, res) => {
      try {
          const newsArticles = await News.find();
          res.json(newsArticles);
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
  });
router.get('/news/:title', async (req, res) => {
  try {
      const { title } = req.params;

      if (!title) {
          return res.status(400).json({ error: 'Title parameter is required for retrieving news by title' });
      }

      const newsArticle = await News.findOne({ title });

      if (newsArticle) {
          res.json(newsArticle);
      } else {
          res.status(404).json({ error: 'News not found' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/news/createdAt/past-two-days', async (req, res) => {
  try {
      const currentDate = new Date();

      const startDate = new Date(currentDate);
      startDate.setUTCDate(currentDate.getUTCDate() - 2);
      startDate.setUTCHours(0, 0, 0, 0);

      const endDate = new Date();
      
      const newsArticles = await News.find({
          createdAt: { $gte: startDate, $lt: endDate }
      });

      if (newsArticles.length > 0) {
          res.json(newsArticles);
      } else {
          res.status(404).json({ error: 'No news articles created in the past two days' });
      }
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
    router.get("/sportnews", async (req, res) => {
      try {
          const newsArticles = await SportNews.find();
          res.json(newsArticles);
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
  });
  router.get('/sportnews/:title', async (req, res) => {
    try {
        const { title } = req.params;
  
        if (!title) {
            return res.status(400).json({ error: 'Title parameter is required for retrieving news by title' });
        }
  
        const newsArticle = await SportNews.findOne({ title });
  
        if (newsArticle) {
            res.json(newsArticle);
        } else {
            res.status(404).json({ error: 'News not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  router.get('/sportnews/createdAt/past-two-days', async (req, res) => {
    try {
        const currentDate = new Date();
  
        const startDate = new Date(currentDate);
        startDate.setUTCDate(currentDate.getUTCDate() - 2);
        startDate.setUTCHours(0, 0, 0, 0);
  
        const endDate = new Date();
        
  
        const newsArticles = await SportNews.find({
            createdAt: { $gte: startDate, $lt: endDate }
        });
  
        if (newsArticles.length > 0) {
            res.json(newsArticles);
        } else {
            res.status(404).json({ error: 'No news articles created in the past two days' });
        }
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
    router.get('/businessnews/:title', async (req, res) => {
      try {
          const { title } = req.params;
    
          if (!title) {
              return res.status(400).json({ error: 'Title parameter is required for retrieving news by title' });
          }
    
          const newsArticle = await BusinessNews.findOne({ title });
    
          if (newsArticle) {
              res.json(newsArticle);
          } else {
              res.status(404).json({ error: 'News not found' });
          }
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
    });
    router.get('/businessnews/createdAt/past-two-days', async (req, res) => {
      try {
          const currentDate = new Date();
    
          const startDate = new Date(currentDate);
          startDate.setUTCDate(currentDate.getUTCDate() - 2);
          startDate.setUTCHours(0, 0, 0, 0);
    
          const endDate = new Date();
    
          const newsArticles = await BusinessNews.find({
              createdAt: { $gte: startDate, $lt: endDate }
          });
    
          if (newsArticles.length > 0) {
              res.json(newsArticles);
          } else {
              res.status(404).json({ error: 'No news articles created in the past two days' });
          }
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
    router.get("/entertainmentnews", async (req, res) => {
      try {
          const newsArticles = await EntertainmentNews.find();
          res.json(newsArticles);
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
  });
  router.get('/entertainmentnews/:title', async (req, res) => {
    try {
        const { title } = req.params;
  
        if (!title) {
            return res.status(400).json({ error: 'Title parameter is required for retrieving news by title' });
        }
  
        const newsArticle = await EntertainmentNews.findOne({ title });
  
        if (newsArticle) {
            res.json(newsArticle);
        } else {
            res.status(404).json({ error: 'News not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  router.get('/entertainmentnews/createdAt/past-two-days', async (req, res) => {
    try {
        const currentDate = new Date();
  
        const startDate = new Date(currentDate);
        startDate.setUTCDate(currentDate.getUTCDate() - 2);
        startDate.setUTCHours(0, 0, 0, 0);
  
        const endDate = new Date();
  
        const newsArticles = await EntertainmentNews.find({
            createdAt: { $gte: startDate, $lt: endDate }
        });
  
        if (newsArticles.length > 0) {
            res.json(newsArticles);
        } else {
            res.status(404).json({ error: 'No news articles created in the past two days' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports.CheckEmail = CheckEmail;
module.exports.router = router;
module.exports.autoSave = autoSave;