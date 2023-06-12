const express = require('express');
const genres = require('../views/genres');
const customers = require('../views/customers');
const movies = require('../views/movies');
const rentals = require('../views/rentals');
const users = require('../views/users');
const auth = require('../views/auth');
const error = require('../middleware/error');

module.exports = (app) => {
    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);

    // Error handling middleware
    app.use(error);
}