const Joi = require('joi');
const mongoose = require('mongoose');

const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: { type: String, required: true, minlength: 3, maxlength: 50 },
            isGold: { type: Boolean, required: true, default: false },
            phone: { type: String, required: true, minlength: 3, maxlength: 50 }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: { type: String, required: true, minlength: 5, maxlength: 255, trim: true },
            dailyRentalRate: { type: Number, required: true, default: 0, min: 0, max: 255 }
        }),
        required: true
    },
    dateOut: { type: Date, required: true, default: Date.now },
    dateReturned: { type: Date },
    rentalFee: { type: Number, min: 0 }
}));

const validateRental = (rental) => {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });

    return schema.validate(rental);
}

module.exports.Rental = Rental;
module.exports.validateRental = validateRental;