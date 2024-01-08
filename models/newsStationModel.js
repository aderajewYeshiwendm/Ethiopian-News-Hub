// NewsStation.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsStationSchema = new Schema({
  
  stationName: {
    type: String,
    required: true,
  },
  socialMediaLinks: {
    type: Map,
    of: String,
  },
  newsSegments: [{
    type: Schema.Types.ObjectId,
    ref: 'NewsSegment',
  }],
});

const NewsStation = mongoose.model('NewsStation', newsStationSchema);

module.exports = NewsStation;
