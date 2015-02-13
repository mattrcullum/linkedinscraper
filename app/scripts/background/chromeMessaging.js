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
app.callTabAction = function (tabID, options, callback) {

    var action = options.action || console.error('actions not set');
    var args = options.args || console.error('args not set');

    if (!(action || args)) {
        return false
    }

    var message = {to: 'content', action: action, args: args};
    chrome.tabs.sendMessage(tabID, message, callback)
};