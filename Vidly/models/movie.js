const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genre');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 5, maxlength: 255, trim: true },
    genre: { type: genreSchema, required: true },
    numberInStock: { type: Number, required: true, default: 0, min: 0, max: 255 },
    dailyRentalRate: { type: Number, required: true, default: 0, min: 0, max: 255 }
})

const Movie = mongoose.model('Movie', movieSchema);

const validateMovie = (movie) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(50).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    });

    return schema.validate(movie);
}

module.exports.movieSchema = movieSchema;
module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;