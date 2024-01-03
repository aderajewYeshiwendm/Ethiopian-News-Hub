const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema({
    _id: String, 
    newsSubscription: Boolean,
    stationSubscription: Boolean,
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
module.exports = Subscription;