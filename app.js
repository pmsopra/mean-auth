const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

const users = require('./routes/users');

const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/users', users);

app.get('/', (req, res) => {
    res.send('Get accepted');
});

app.listen(port, () => {
    console.log('Server on ' + port);
});