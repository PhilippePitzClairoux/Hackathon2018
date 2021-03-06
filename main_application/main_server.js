var http = require('http');
/*var EventEmitter = require('events');

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

    buffer = {
    "key" : "value",
    "key2" : "val2"
};
*/
http.createServer((request, response) => {

    const { headers, method, url } = request;
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        // BEGINNING OF NEW STUFF

        response.on('error', (err) => {
            console.error(err);
        });

        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        // Note: the 2 lines above could be replaced with this next one:
        // response.writeHead(200, {'Content-Type': 'application/json'})

        const responseBody = { headers, method, url, body };

        let str = JSON.stringify(responseBody.body)


        console.log(str.toString())
       // console.log(JSON.stringify(responseBody.body));
        response.write(JSON.stringify(responseBody.body));



        response.end();
        // Note: the 2 lines above could be replaced with this next one:
        // response.end(JSON.stringify(responseBody))

        // END OF NEW STUFF
    });
}).listen(8080); // Activates this server, listening on port 8080.