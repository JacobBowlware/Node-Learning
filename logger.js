// Module: logger

var url = 'http://mylogger.io/log';

const log = (message) => {
    // Send an HTTP request
    console.log(message);
}

// Export the log function
module.exports.log = log;
// module.exports.endPoint = url;