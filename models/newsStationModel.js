// NewsStation.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsStationSchema = new Schema({
  stationId: { type: mongoose.Schema.Types.ObjectId, auto: true },

  stationName: {
    type: String,
    required: true,
  },
  socialMediaLinks: {
    type: Map,
    of: String,
  },
  createdAt: { type: Date, default: Date.now },
  newsSegments: [{
    type: Schema.Types.ObjectId,
    ref: 'NewsSegment',
  }],
});

const NewsStation = mongoose.model('NewsStation', newsStationSchema);

module.exports = NewsStation;
