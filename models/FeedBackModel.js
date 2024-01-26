const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    feedback: String
});
const FeedbackModel = mongoose.model('Feedback', feedbackSchema);
module.exports = FeedbackModel;