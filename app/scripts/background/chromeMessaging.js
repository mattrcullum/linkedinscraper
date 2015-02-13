/**
 * Created by matthew on 2/13/15.
 */

// message sending/receiving
chrome.runtime.onMessage.addListener(function (message) {
    if (message.action == "openApp") {
        if (results) {
            chrome.tabs.create({url: message.path})
        }
    }
});

// provides a proxy to call a content script function
app.callTabAction = function (tabID, action, callback, args) {

    if (!action) {
        console.error('actions not set');
        return false
    }

    var message = {to: 'content', action: action, args: args};

    chrome.tabs.sendMessage(tabID, message, callback)
};