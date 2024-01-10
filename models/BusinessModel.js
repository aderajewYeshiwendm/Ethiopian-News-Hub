const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, auto: true },

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
  createdAt: { type: Date, default: Date.now }

});

const BusinessNews = mongoose.model('businessNews', newsSchema);

module.exports = BusinessNews;
