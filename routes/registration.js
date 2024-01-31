// Import necessary modules
const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
require('dotenv').config();
const UserModel = require('../models/usermodel');
const mongoose = require('mongoose')

// Passport Google OAuth Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ["profile", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log("Google Authentication Response:", { accessToken, refreshToken, profile });
            try {
                const existingUser = await UserModel.findOne({ googleId: profile.id });
                if (existingUser) {
                    return done(null, existingUser);
                }
                const newUser = await UserModel.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    googleId: profile.id,
                });
                return done(null, newUser);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

// Serialize and Deserialize User
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Function to Check email format
function CheckEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to handle authentication and user data saving
async function autoSave({ name, age, gender, address, username, email, password, googleId, role }, res, action) {
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
            const user = await UserModel.findOne({ username: username });
            if (user) {
                if (email === 'adeyeshi294@gmail.com' && password === '12344') {
                    user.role = 'admin';
                }
                if (user.role === 'admin') {
                    console.log(user.role)
                    return res.json({
                        success: true,
                        message: 'Login successful',
                        redirectUrl: '/post.html', // Redirect to the post page for admin
                    });
                } else {
                    // For regular users 
                    return res.json({ success: true, message: 'Login successful' });
                }
            } else {
                return res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
        }

        if (action === 'update') {
            // Update user account based on provided data
            await UserModel.findOneAndUpdate({ email }, { name, age, gender, address, username });
            return res.json({ success: true, message: 'User account updated successfully' });
        }

        if (action === 'register') {
            if (!password || !username) {
                return res.status(400).json({ success: false, message: 'Password and username are required for registration' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await UserModel.create({ name, age, gender, address, username, email, password: hashedPassword, googleId, role });
            // Check email format
            if (!CheckEmail(email)) {
                return res.status(400).json({ success: false, message: 'Invalid email format' });
            }
            return res.json({ success: true, message: 'User registered successfully', user: newUser });
        }

        if (action === 'google') {
            const username = generateUniqueUsername(user.email);
            const hashedPassword = await bcrypt.hash(password, 10);
            await UserModel.create({ ...user, username, password: hashedPassword });
        }
    } catch (error) {
        return res.status(401).json({ "message": "Invalid credentials", "success": false });
    }
}

// Route for registering a user
router.post('/register', async (req, res) => {
    const { name, age, address, gender, username, email, password, role } = req.body;
    return autoSave({ name, age, address, gender, username, email, password, role }, res, 'register');
});

// Route for logging in a user
router.post('/login', async (req, res) => {
    const { username, password, email } = req.body;
    const user = { username, password, email };

    if (email === 'adeyeshi294@gmail.com' && password === '12344') {
        return autoSave({ ...user, role: 'admin' }, res, 'login');
    } else {
        return autoSave(user, res, 'login');
    }
});

// Route for Google OAuth authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route for Google OAuth callback
router.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: 'http://localhost:3000/index.html',
        failureRedirect: 'http://localhost:3000/post.html',
    })
);
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;   
    try {
        const user = await UserModel.findOne({ userId });
        
        if (user) {
            const { password, ...userData } = user.toObject();

            return res.status(200).json({ success: true, user: userData });}else{
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Omit sensitive fields like password before sending user data
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

router.delete('/user/:userId', async (req, res) => {
    const { userId } = req.params;   
    try {
        // Find the user by userId
        const user = await UserModel.findOne({ userId });
        
        if (user) {
            // Delete the user from the database
            await UserModel.deleteOne({ userId });
            
            return res.status(200).json({ success: true, message: 'User deleted successfully' });
        } else {
            // If user not found, return 404 Not Found status
            return res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        // If an error occurs during deletion, return 500 Internal Server Error status
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Route for updating user account
router.put('/update', async (req, res) => {
    const { name, age, gender, address, username, email } = req.body;
    return autoSave({ name, age, gender, address, username, email }, res, 'update');
});

// Export necessary functions and router
module.exports.CheckEmail = CheckEmail;
module.exports.router = router;
module.exports.autoSave = autoSave;
