const express  = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const UserModel = require('./models/usermodel')
const app = express()
app.use(bodyParser.json())
mongoose.connect('mongodb://127.0.0.1:27017/ethiopian-news-hub');
// Register User
app.post('/signup', async (req, res) => {  
    try {
      UserModel.create(req.body)
      res.json({ success: true, message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error registering user' });
    }
  });

// Login User
app.post('/login', async (req, res) => {
    const {email, password } = req.body;
  
    try {
      const user = await UserModel.findOne({email, password });
      if (user && user.password == password && user.email === email) {
        res.json({ success: true, message: 'Login successful' });
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error logging in' });
    }
  });
  
  
const port = 5000;
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})