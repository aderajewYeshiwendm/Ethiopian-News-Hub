const mongoose = require('mongoose');
const ReactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    newsId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    action: String, // Like, Comment, Share
    comment:String
    
});
const ReactionModel = mongoose.model('React', ReactionSchema);
module.exports = ReactionModel;