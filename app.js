const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
    console.log('connected to database ' + config.database);
})

mongoose.connection.on('eror', (err) => {
    console.log('Database error ' + err);
})

const app = express();
app.use(cors());

const users = require('./routes/users');
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

app.get('/', (req, res) => {
    res.send('Get accepted');
});

app.listen(port, () => {
    console.log('Server on ' + port);
});