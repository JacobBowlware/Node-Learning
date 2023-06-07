const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const { Rental, validateRental } = require('../models/rental');


router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('dateOut');
    res.send(rentals);
});

router.post('/', auth, async (req, res) => {
    const { error } = validateRental(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Customer with given ID was not found.');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Movie with given ID was not found.');

    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');
    const rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    try {
        const result = await rental.save();
        console.log(result);

        movie.numberInStock--;
        movie.save();
    }
    catch (ex) {
        for (field in ex.errors)
            console.log("Error here --> " + ex.errors[field].message);
    }

    res.send(rental);
});

module.exports = router;