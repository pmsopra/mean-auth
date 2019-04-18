const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user');

router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, message: 'Failed to register user' });
            return;
        }

        res.json({ success: true, message: 'User registered' });
    });
});

router.get('/authenticate', (req, res, next) => {
    res.send('Authenticate');
});

router.get('/profile', (req, res, next) => {
    res.send('Profile');
});

module.exports = router;