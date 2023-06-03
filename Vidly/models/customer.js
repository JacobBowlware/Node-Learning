const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    phone: { type: String, required: true, minlength: 3, maxlength: 50 },
    isGold: { type: Boolean, default: false }
})

const Customer = mongoose.model('Customer', customerSchema);

const validateCustomer = (customer) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(3).max(50).required(),
        isGold: Joi.boolean()
    });

    return schema.validate(customer);
}

module.exports.customerSchema = customerSchema;
module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;