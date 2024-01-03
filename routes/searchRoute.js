
app.get('/search', async (req, res) => {
  try {
    const { query } = req.query;

    // Use Mongoose to perform a case-insensitive search on 'news' and 'user' fields
    const results = await Search.find({
      $or: [
        { news: { $regex: new RegExp(query, 'i') } },
        { user: { $regex: new RegExp(query, 'i') } },
      ],
    })
    .populate('news')
    .populate('station');

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
