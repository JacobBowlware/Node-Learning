// Module: logger
const EventEmitter = require('events');

// console.log(__filename);
// console.log(__dirname);

class Logger extends EventEmitter {
    log = (message) => {
        // Send an HTTP request
        console.log(message);

        // Raise an event
        this.emit('messageLogged', { id: 1, url: 'http://' });
    }
}

// Export the log function
module.exports = Logger;
