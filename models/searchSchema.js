// Search.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const searchSchema = new Schema({
  news: {
    type: Schema.Types.ObjectId,
    ref: 'News',
  },
  user: String,
  userId: Number,
  station: {
    type: Schema.Types.ObjectId,
    ref: 'NewsStation',
  },
  stationId: Number,
});

const Search = mongoose.model('Search', searchSchema);

module.exports = Search;
