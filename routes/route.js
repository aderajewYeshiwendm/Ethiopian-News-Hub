const express = require('express');
const router = express.Router();
const News = require('../models/EthioNewsModel');
const NewsStation = require('../models/newsStationModel');
const SportNews = require('../models/SportModel')
const EntertainmentNews = require('../models/EntertainmentModel')
const BusinessNews = require('../models/BusinessModel')
const FeedbackModel = require('../models/FeedBackModel')
const HostModel = require('../models/HostModel')
require('dotenv').config()
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
  router.post('/feedback', async (req, res) => {
    try {
        const feedback = new FeedbackModel({ feedback: req.body.feedback });
        await feedback.save();
        res.status(201).json({ message: 'Feedback saved successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.post('/host', async (req, res) => {
  try {
      const { hostName, password} = req.body;
      const host = new HostModel({ hostName, password});
      await host.save();
      res.status(201).json({ message: 'Host created successfully' });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

// Express route to get host details
router.get('/host/:id', async (req, res) => {
  try {
      const host = await HostModel.findById(req.params.id);
      res.json(host);
  } catch (error) {
      res.status(404).json({ error: 'Host not found' });
  }
});

// Express route to update host password
router.put('/host/:id/password', async (req, res) => {
  try {
      const host = await HostModel.findById(req.params.id);
      host.password = req.body.password;
      await host.save();
      res.json({ message: 'Password updated successfully' });
  } catch (error) {
      res.status(404).json({ error: 'Host not found' });
  }
});

module.exports.router = router;
