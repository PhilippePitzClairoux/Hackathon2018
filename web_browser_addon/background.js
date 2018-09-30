//background script
"use-strict";

const TIME_BEFORE_ACTION = 15;
const CLICKS_BEFORE_ACTION = 10;

var _FACEBOOK_ID = -1;
var _FACEBOOK_TIMER = "";
var _CLIPBOARD_COUNTER = 0;

function whenClosed() {
    console.log("Facebook closed!");
}

function whenError(error) {
    console.log(`${error}`);
}

function isUserOnWebsite(site_to_find) {
    let list = browser.windows.getAll({ "populate": true });

    list.then(function(result) {
        if (result[0].title.toLowerCase().search(site_to_find) > -1)
            _FACEBOOK_ID =  result[0].id;
        for (let i =0; i < result[0].tabs.length; i++) {
                if (result[0].tabs[i].title.toLowerCase().search(site_to_find) >= 0)
                    _FACEBOOK_ID = result[0].tabs[i].windowId;
        }
    });
}

function handleMessage(request, sender, sendResponse) {

    let buffer = "nothing";

    isUserOnWebsite("facebook");

    if (_FACEBOOK_TIMER === "")
        _FACEBOOK_TIMER = new Date();

    if (_FACEBOOK_ID !== -1) {
        let tmp = new Date();
        buffer = Math.round((((tmp - _FACEBOOK_TIMER) % 86400000) % 3600000) / 60000);

        if (buffer >= TIME_BEFORE_ACTION && _FACEBOOK_ID !== -1) {
            var tmp2 = this.browser.windows.remove(_FACEBOOK_ID);
            tmp2.then(whenClosed, whenError);
        }
    }
    sendResponse({"response": `${buffer.toString()}`});
}

browser.runtime.onMessage.addListener(handleMessage);