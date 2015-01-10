var app = null;

chrome.runtime.onMessage.addListener(
    function (message, sender, callback) {
        if (message.to == "background") {
            switch (message.action) {
                case 'open_app':
                    var path = chrome.extension.getURL(message.path);
                    chrome.tabs.create({url: path}, function (tab) {
                        app = tab;
                    });
                    break;
            }
        }
    });

function sendTabMessage(tabId, message, callback, args) {
    chrome.tabs.sendMessage(tabId, {to: 'content', message: message, args: args}, callback)
}
