var http = require('http');
var EventEmitter = require('events');

class MyEmitter extends EventEmitter {};

var myEmitter = new MyEmitter();
myEmitter.on('event', () => {
    console.log('an event occurred!');
});

myEmitter.on('event', function(a, b) {
    console.log(a, b, this, this === myEmitter);
    // Prints:
    //   a b MyEmitter {
    //     domain: null,
    //     _events: { event: [Function] },
    //     _eventsCount: 1,
    //     _maxListeners: undefined } true

});

http.createServer((request, response) => {
    const { headers, method, url } = request;
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        // At this point, we have the headers, method, url and body, and can now
        // do whatever we need to in order to respond to this request.

        console.log(headers);
        console.log(body);
        response.writeHead(200);
        response.end()
    });
}).listen(8080); // Activates this server, listening on port 8080.