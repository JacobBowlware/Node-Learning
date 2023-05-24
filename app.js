const logger = require('./logger.js');

const sayHello = (name) => {
    console.log(`Hello ${name}`);
}

sayHello("Jacob");

// console.log(logger);
logger.log('message');