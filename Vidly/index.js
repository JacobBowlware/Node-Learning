const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const genres = require('./views/genres');
const customers = require('./views/customers');
const movies = require('./views/movies');
const rentals = require('./views/rentals');
const users = require('./views/users');
const auth = require('./views/auth');
const config = require('config');
const mongoose = require('mongoose');
const app = express();

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});