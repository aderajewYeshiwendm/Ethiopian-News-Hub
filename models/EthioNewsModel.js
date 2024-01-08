const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
 
  title: {
    type: String,
    required: true,
  },
  news: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
