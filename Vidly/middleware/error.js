const winston = require('winston');

const error = (err, req, res, next) => {
    // First arg is level (could be error, warn, or info), second is message, third is metadata - on winston.log
    winston.error(err.message, err);
    res.status(500).send('Something failed.');
}

module.exports = error;