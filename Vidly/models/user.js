const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    password: { type: String, required: true, minlength: 5, maxlength: 1024 }
}));

const validateUser = (user) => {
    const schema = Joi.object({
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(5).max(1024).required(),
        name: Joi.string().min(3).max(50).required()
    });

    return schema.validate(user);
}

module.exports.User = User;
module.exports.validateUser = validateUser;