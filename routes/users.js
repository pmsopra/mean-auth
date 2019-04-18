const express = require('express');
const router = express.Router();

router.post('/register', (req, res, next) => {
    res.send('Register');
});

router.get('/authenticate', (req, res, next) => {
    res.send('Authenticate');
});

router.get('/profile', (req, res, next) => {
    res.send('Profile');
});

module.exports = router;