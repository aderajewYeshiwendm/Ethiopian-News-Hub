const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  newsId: { type: mongoose.Schema.Types.ObjectId, auto: true },

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
  article: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now }

});

const News = mongoose.model('News', newsSchema);

module.exports = News;
