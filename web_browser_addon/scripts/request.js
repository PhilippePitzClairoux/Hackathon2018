const ip = '127.0.0.1';
const port= 8080;
const server = { address: ip + ":" + port.toString() };
const request = new XMLHttpRequest();

function onError(event) {
    console.log("There was an unexpected error : ", event.target.status);
    console.table(event);
}

request.onerror = onError;
