const express = require('express');
const genres = require('./views/genres');
const customers = require('./views/customers');
const movies = require('./views/movies');
const rentals = require('./views/rentals');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});