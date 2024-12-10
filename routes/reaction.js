const express = require('express');
const router = express.Router();

const ReactionModel = require('../models/ReactionModel')
router.post('/news/like', async (req, res) => {
    try {
        const { userId, newsId } = req.body;
        const reaction = new ReactionModel({ userId, newsId, action: 'Like' });
        await reaction.save();
        res.json({ liked: true });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/news/comment', async (req, res) => {
    try {
        const { userId, newsId, comment } = req.body;
        const reaction = new ReactionModel({ userId, newsId, action: 'Comment', comment });
        await reaction.save();
        res.json({ comment: 'comment posted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports.router = router;

