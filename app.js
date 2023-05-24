// const path = require('path');
// const pathObj = path.parse(__filename);
// console.log(pathObj);

// const os = require('os');
// const totalMemory = os.totalmem();
// const freeMemory = os.freemem();
// console.log(`Total Memory: ${totalMemory}`);
// console.log(`Free Memory: ${freeMemory}`);

// const fs = require('fs');
// // The second argument is the callback function.
// const files = fs.readdir('./', (err, files) => {
//     if (err) console.log('Error', err);
//     else console.log('Result', files);
// });

// Notice the upper-case naming convention for classes.
// const EventEmitter = require('events');
// const Logger = require('./logger');
// const logger = new Logger();
// // Register a listener
// logger.on('messageLogged', (arg) => {
//     console.log(arg);
// });
// logger.log('message');

const http = require('http');
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello World');
        res.end();
    }

    if (req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});

// server.on('connection', (socket) => {
//     console.log('New connection...');
// });

server.listen(3000);

console.log('Listening on port 3000...');
