

const request = require('supertest');
const express = require('express');
const router = require('../routes/route').router; 

const app = express();
app.use(express.json());
app.use(router);

describe('Integration tests for routes', () => {
  it('POST /news should create a new news article', async () => {
    // Test case for creating a new news article
  });

  it('GET /news should retrieve all news articles', async () => {
    // Test case for retrieving all news articles
  });

  it('GET /news/:title should retrieve a specific news article by title', async () => {
    // Test case for retrieving a specific news article by title
  });

  it('GET /news/createdAt/past-two-days should retrieve news articles created in the past two days', async () => {
    // Test case for retrieving news articles created in the past two days
  });

  //tests for other routes (POST /sportnews, GET /sportnews, etc.)
});
