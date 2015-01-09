var app = null;

chrome.runtime.onMessage.addListener(
    function (request, sender, callback) {
        if (request.to == "background") {
            switch (request.action) {
                case 'open_app':
                    var path = chrome.extension.getURL(request.path);
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
