//Content script
"use-strict";
/*
How to do a request :
request.open('GET', 'http://www.mozilla.org/', true);
request.send(null);
*/

var info;
var info_to_get;

function handleResponse(message) {
    console.log(message);
    info = message;
}

function handleError(error) {
    console.log(`${error}`);
}

function notifyBackgroundPage(e) {
    var sending = browser.runtime.sendMessage({
        "getInfo": info_to_get
    });
    sending.then(handleResponse, handleError);
}

setTimeout(() => {
    info_to_get = "test";

    notifyBackgroundPage();
    window.addEventListener("DOMContentLoaded", notifyBackgroundPage);
    window.addEventListener("scroll", notifyBackgroundPage);
    window.addEventListener("click", notifyBackgroundPage);
}, 60000);
