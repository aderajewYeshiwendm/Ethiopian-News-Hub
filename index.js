const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const UserModel = require('./models/usermodel');
const app = express();
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/ethiopian-news-hub');

// Function to Check email format
function CheckEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to handle authentication and user data saving
async function autoSave({ name,age,gender,address, username, email, password }, res, action) {
    try {

        // Check if email is already registered during register
        if (action === 'register') {
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'Email already registered' });
            }
        }

        // Check if user exists during login
        if (action === 'login') {
            const user = await UserModel.findOne({ username, password });
            if (!user && user.username !== username && user.password !== password) {
                return res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
        }

        // Create new user during register
        if (action === 'register') {
            const newUser = await UserModel.create({ name,age,gender,address,username, email, password });
            // Check email format
        if (!CheckEmail(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format' });
        }
            return res.json({ success: true, message: 'User registered successfully', user: newUser });
        }

        // Authenticate user during login
        if (action === 'login') {
            return res.json({ success: true, message: 'Login successful' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: `Error ${action} user`, error: error.message });
    }
}

// register User
app.post('/register', async (req, res) => {
    const { name,age,address,gender, username, email, password } = req.body;
    return autoSave({ name,age,address,gender, username, email, password }, res, 'register');
});

// Login User
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    return autoSave({ username, password }, res, 'login');
});

const port = 5000;
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
